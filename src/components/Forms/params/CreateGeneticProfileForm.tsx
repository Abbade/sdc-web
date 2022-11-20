import { Box, Button, Grid } from "@mui/material";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useContext, useEffect } from "react";
import { FieldError, SubmitHandler, useForm } from "react-hook-form";
import { AlertContext } from "../../../contexts/AlertContext";
import { EditInterface } from "../../../interfaces/EditInterface";
import { api } from "../../../services/apiClient";
import BasicTextField from "../../Inputs/BasicTextField";

type CreateGeneticProfileFormData = {
  name: string;
  description: string;
  id?: number;
};

const createObjFormSchema = yup.object().shape({
  name: yup.string().required("Nome é obrigatório"),
  description: yup.string().required("Descrição é obrigatório"),
});


export default function CreateGeneticProfileForm({ id, onClose }: EditInterface) {
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
        const item = await api.get(`profile/${id}`);
        setValue("name", item.data.name);
        setValue("description", item.data.description);
        setValue("id", item.data.id);
        setOpenLoading(false);
      }
    };
    get(id);
  }, [id, setValue, setOpenLoading]);

  const handleLoteSubmit: SubmitHandler<CreateGeneticProfileFormData> = async (
    formData
  ) => {
    try {
      try {
        if (formData.id > 0) {
          const item = await api.put("profile", formData);
          showAlert("Perfil Genético editada com sucesso.", "success");
        } else {
          const item = await api.post("profile", formData);
          showAlert("Perfil Genético cadastrada com sucesso.", "success");
        }
        setOpenLoading(false);
        onClose(true);
      } catch (error) {
        setOpenLoading(false);
        const errorOficial = error as Error;
      }
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
        Salvar Perfil Genético
      </Button>
    </Box>
  );
}
