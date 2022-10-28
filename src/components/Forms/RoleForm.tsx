import { yupResolver } from "@hookform/resolvers/yup";
import { Button, createTheme } from "@mui/material";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import Router from "next/router";
import { useContext, useEffect, useState } from "react";
import { FieldError, SubmitHandler, useForm } from "react-hook-form";
import * as yup from "yup";
import { AlertContext } from "../../contexts/AlertContext";
import { EditInterface } from "../../interfaces/EditInterface";
import { api } from "../../services/apiClient";
import BasicAutocomplete from "../Inputs/BasicAutocompleteMultiple";
import BasicTextField from "../Inputs/BasicTextField";

type CreateFormData = {
  name: string;
  id?: number;
  permissions?: PermissoesData[];
};
type PermissoesData = {
  id: number;
  code: string;
  name: string;
};

const createObjFormSchema = yup.object().shape({
  id: yup.number(),
  name: yup.string().required("Nome é obrigatório"),
  permissions: yup
    .array()
    .required("Permissao é obrigatória")
    .min(1, "Permissão é Obrigatória"),
});

const theme = createTheme();

export default function RoleForm({ id }: EditInterface) {
  const {
    register,
    handleSubmit,
    control,
    setValue,
    formState: { errors, isSubmitting },
  } = useForm({ resolver: yupResolver(createObjFormSchema) });

  const { showAlert } = useContext(AlertContext);
  const [permissions, setPermissions] = useState([] as PermissoesData[]);

  useEffect(() => {
    const get = async () => {
      const permissions = await api.get("/permissions");
      setPermissions(permissions.data.itens);
    };

    get();
  }, []);

  useEffect(() => {
    const get = async (id) => {
      if (id > 0) {
        const item = await api.get(`roles/${id}`);
        setValue("name", item.data.name);
        setValue("id", item.data.id);
        setValue("permissions", item.data.permissions);
      }
    };

    get(id);
  }, [id]);

  const handleLoteSubmit: SubmitHandler<CreateFormData> = async (formData) => {
    try {
      if (formData.id > 0) {
        const item = await api.put("roles", formData);
        showAlert("Perfil editado com sucesso.", "success");
      } else {
        const item = await api.post("roles", formData);
        showAlert("Perfil cadastrado com sucesso.", "success");
      }
      Router.back();
    } catch (error) {
      showAlert(error.response.data.message, "error");
    }
  };

  return (
    <Box
      component="form"
      noValidate
      onSubmit={handleSubmit(handleLoteSubmit)}
      sx={{ mt: 3 }}
    >
      <Grid container spacing={2}>
        <Grid item xs={12} sm={12}>
          <BasicTextField
            label={"Nome"}
            name={"name"}
            control={control}
            error={errors.name as FieldError}
          />
        </Grid>
        <Grid item xs={12} sm={12}>
          <BasicAutocomplete
            control={control}
            label={"Permissões"}
            name={"permissions"}
            error={errors.permissions as FieldError}
            options={permissions}
          />
        </Grid>
      </Grid>

      <Button type="submit" fullWidth variant="contained" sx={{ mt: 3, mb: 2 }}>
        {id > 0 ? "Editar" : "Cadastrar"} Perfil
      </Button>
    </Box>
  );
}
