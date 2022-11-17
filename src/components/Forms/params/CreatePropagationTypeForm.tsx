import { Box, Button, createTheme, Grid } from "@mui/material";
import * as yup from "yup";
import Router from "next/router";
import { useContext, useEffect } from "react";
import { api } from "../../../services/apiClient";
import { yupResolver } from "@hookform/resolvers/yup";
import { FieldError, SubmitHandler, useForm } from "react-hook-form";
import { AlertContext } from "../../../contexts/AlertContext";
import { EditInterface } from "../../../interfaces/EditInterface";
import BasicTextField from "../../Inputs/BasicTextField";

type CreatePropagationTypeFormData = {
  name: string;
  description: string;
  id?: number;
};

const createObjFormSchema = yup.object().shape({
  id: yup.number(),
  name: yup.string().required("Nome é obrigatório"),
  description: yup.string().required("Descrição é obrigatório"),
});

const theme = createTheme();

export default function CreatePropagationTypeForm({ id, onClose }: EditInterface) {
  const {
    register,
    handleSubmit,
    control,
    setValue,
    formState: { errors, isSubmitting },
  } = useForm({ resolver: yupResolver(createObjFormSchema) });

  const { showAlert, setOpenLoading } = useContext(AlertContext);

  useEffect(() => {
    const get = async (id) => {
      if (id > 0) {
        setOpenLoading(true);
        const item = await api.get(`propagation-type/${id}`);
        setValue("name", item.data.name);
        setValue("description", item.data.description);
        setValue("id", item.data.id);
        setOpenLoading(false);
      }
    };
    get(id);
  }, [id, setValue, setOpenLoading]);

  const handleLoteSubmit: SubmitHandler<CreatePropagationTypeFormData> = async (
    formData
  ) => {
    try {
      if (formData.id > 0) {
        const item = await api.put("propagation-type", formData);
        showAlert("Tipo de Propagação editada com sucesso.", "success");
      } else {
        const item = await api.post("propagation-type", formData);
        showAlert("Tipo de Propagação cadastrada com sucesso.", "success");
      }
      setOpenLoading(false);
      onClose(true);
    } catch (error) {
      setOpenLoading(false);
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
        <Grid item xs={12} sm={12}>
          <BasicTextField
            label={"Descrição"}
            name={"description"}
            control={control}
            error={errors.description as FieldError}
          />
        </Grid>
      </Grid>

      <Button type="submit" fullWidth variant="contained" sx={{ mt: 3, mb: 2 }}>
        {id > 0 ? "Editar" : "Cadastrar"} Forma de Propagação
      </Button>
    </Box>
  );
}
