import { Box, Button, createTheme, Grid } from "@mui/material";
import * as yup from "yup";

import Router from "next/router";
import { useContext, useEffect, useState } from "react";
import { api } from "../../../services/apiClient";

import { yupResolver } from "@hookform/resolvers/yup";
import { FieldError, SubmitHandler, useForm } from "react-hook-form";
import { AlertContext } from "../../../contexts/AlertContext";
import { EditInterface } from "../../../interfaces/EditInterface";
import { Genetic } from "../../../interfaces/LoteInterface";
import BasicSelect from "../../Inputs/BasicSelect";
import BasicTextField from "../../Inputs/BasicTextField";

type CreateGeneticProfileFormData = {
  id?: number;
  name: string;
  nick: string;
  id_profile: number;
  description: string;
};

const createObjFormSchema = yup.object().shape({
  name: yup.string().required("Código é obrigatório"),
  nick: yup.string().required("Nome é obrigatório"),
  id_profile: yup.number().required("Perfil genético é obrigatório"),
  description: yup.string().required("Descrição é obrigatório"),
});

const theme = createTheme();

export default function CreateGeneticForm({ id, onClose }: EditInterface) {
  const {
    register,
    handleSubmit,
    control,
    setValue,
    formState: { errors, isSubmitting },
  } = useForm({ resolver: yupResolver(createObjFormSchema) });

  const [profile, setProfiles] = useState([] as Genetic[]);
  const { setAlert, setOpenLoading, showAlert } = useContext(AlertContext);

  useEffect(() => {
    const getProfiles = async () => {
      setOpenLoading(true);
      var response = await api.get("/profile");
      setProfiles(response.data);
      setOpenLoading(false);
    };

    getProfiles();
    const get = async (id) => {
      
      if (id > 0) {
        setOpenLoading(true);
        const item = await api.get(`genetic/${id}`);
        setValue("name", item.data.name);
        setValue("id", item.data.id);
        setValue("nick", item.data.nick);
        setValue("id_profile", item.data.id_profile);
        setValue("description", item.data.description);

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
        setOpenLoading(true);
        console.log("genetica form pronto")
        console.log(formData);
        if (formData.id > 0) {
          const item = await api.put("genetic", formData);
          showAlert("Genética editada com sucesso.", "success");
        } else {
          const item = await api.post("genetic", formData);
          showAlert("Genética cadastrada com sucesso.", "success");
        }

        onClose(true);
        setOpenLoading(false);
      } catch (error) {
        const errorOficial = error as Error;
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
            label={"Perfil Genético"}
            name={"id_profile"}
            values={profile}
            control={control}
            error={errors.id_profile as FieldError}
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
            label={"Sigla"}
            name={"nick"}
            control={control}
            error={errors.nick as FieldError}
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
