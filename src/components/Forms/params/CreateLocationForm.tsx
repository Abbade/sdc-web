import { Box, Button, createTheme, Grid } from "@mui/material";
import * as yup from "yup";
import Router from "next/router";
import { useContext, useEffect, useState } from "react";
import { api } from "../../../services/apiClient";
import { yupResolver } from "@hookform/resolvers/yup";
import { FieldError, SubmitHandler, useForm } from "react-hook-form";
import BasicSelect from "../../Inputs/BasicSelect";
import BasicTextField from "../../Inputs/BasicTextField";
import { EditInterface } from "../../../interfaces/EditInterface";
import { AlertContext } from "../../../contexts/AlertContext";

type CreateLocationFormData = {
  name: string;
  id_faseCultivo: string;
  id_section: number;
  description: string;
  id?: number;
};

const createObjFormSchema = yup.object().shape({
  name: yup.string().required("Nome é obrigatório"),
  id_section: yup.number().required("Perfil genético é obrigatório"),
  id_faseCultivo: yup.number().required("Perfil genético é obrigatório"),
  description: yup.string().required("Descrição é obrigatório"),
});

const theme = createTheme();

export default function CreateLocationForm({ id, onClose }: EditInterface) {
  const {
    handleSubmit,
    control,
    setValue,
    formState: { errors, isSubmitting },
  } = useForm({ resolver: yupResolver(createObjFormSchema) });

  const [section, setSections] = useState([] as any[]);
  const { showAlert, setOpenLoading } = useContext(AlertContext);

  useEffect(() => {
    console.log("render aaa")
    const get = async (id) => {
      setOpenLoading(true);
      var response = await api.get("/section");
      setSections(response.data.itens);
      var response1 = await api.get("/fase-cultivo");
      setFasesCultivo(response1.data.itens);
      if (id > 0) {
        const item = await api.get(`location/${id}`);
        setValue("name", item.data.name);
        setValue("description", item.data.description);
        setValue("id_faseCultivo", item.data.id);
        setValue("id_section", item.data.id);
        setValue("id", item.data.id);

      }
      setOpenLoading(false);
    };
    get(id);
  }, [id, setValue, setOpenLoading]);

  const [faseCultivo, setFasesCultivo] = useState([] as any[]);

  const handleLoteSubmit: SubmitHandler<CreateLocationFormData> = async (
    formData
  ) => {
    try {
      try {
        setOpenLoading(true);
        if (formData.id > 0) {
          const item = await api.put("location", formData);
          showAlert("Localização editada com sucesso.", "success");
        } else {
          const item = await api.post("location", formData);
          showAlert("Localização cadastrada com sucesso.", "success");
        }
        setOpenLoading(false);
        onClose(true);
      } catch (error) {
        const errorOficial = error as Error;
        setOpenLoading(false);
        showAlert(errorOficial.message, "error");
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
          <BasicSelect
            label={"Seção"}
            name={"id_section"}
            values={section}
            control={control}
            error={errors.id_profile as FieldError}
          />
        </Grid>
        <Grid item xs={12} sm={12}>
          <BasicSelect
            label={"Fase de Cultivo Vinculado"}
            name={"id_faseCultivo"}
            values={faseCultivo}
            control={control}
            error={errors.id_faseCultivo as FieldError}
          />
        </Grid>
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
        Salvar Local
      </Button>
    </Box>
  );
}
