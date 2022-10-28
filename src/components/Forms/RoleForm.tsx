import { Button, createTheme } from "@mui/material";
import  Box from "@mui/material/Box";
import  Grid from "@mui/material/Grid";
import * as yup from "yup";
import Router from "next/router";
import { useContext, useEffect } from "react";
import { api } from "../../services/apiClient";
import { yupResolver } from "@hookform/resolvers/yup";
import { FieldError, SubmitHandler, useForm } from "react-hook-form";
import { AlertContext } from "../../contexts/AlertContext";
import { EditInterface } from "../../interfaces/EditInterface";
import BasicTextField from "../Inputs/BasicTextField";

type CreateFormData = {
  name: string;
  id?: number;
};

const createObjFormSchema = yup.object().shape({
  id: yup.number(),
  name: yup.string().required("Nome é obrigatório"),
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

  useEffect(() => {
    const get = async (id) => {
      if (id > 0) {
        const item = await api.get(`roles/${id}`);
        setValue("name", item.data.name);
        setValue("id", item.data.id);
      }
    };
    get(id);
  }, [id]);

  const handleLoteSubmit: SubmitHandler<CreateFormData> = async (
    formData
  ) => {
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
      const errorOficial = error as Error;
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
      </Grid>

      <Button type="submit" fullWidth variant="contained" sx={{ mt: 3, mb: 2 }}>
        {id > 0 ? "Editar" : "Cadastrar"} Perfil
      </Button>
    </Box>
  );
}
