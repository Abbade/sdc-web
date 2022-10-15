import {
    Box, Button, createTheme, Grid
  } from "@mui/material";
  import * as yup from "yup";
  
  import Router from "next/router";
  import { useEffect, useState } from "react";
  import { api } from "../../../services/apiClient";
  
  import { yupResolver } from "@hookform/resolvers/yup";
  import {
    FieldError,
    SubmitHandler,
    useForm
  } from "react-hook-form";
  import {
    Genetic, PropagationType
  } from "../../../interfaces/LoteInterface";
  import BasicDatePicker from "../../Inputs/BasicDatePicker";
  import BasicSelect from "../../Inputs/BasicSelect";
  import BasicTextField from "../../Inputs/BasicTextField";
  
  type CreateGeneticProfileFormData = {
   name: string;
   nick: string;
   id_profile: number;
   description: string;
  };
  
  const createObjFormSchema = yup.object().shape({
    name: yup.string().required("Nome é obrigatório"),
    id_section: yup.number().required("Perfil genético é obrigatório"),
    id_faseCultivo: yup.number().required("Perfil genético é obrigatório"),
    description: yup.string().required("Descrição é obrigatório"),
  });
  
  const theme = createTheme();
  
  export default function CreateLocationForm() {
    const {
      register,
      handleSubmit,
      control,
      formState: { errors, isSubmitting },
    } = useForm({ resolver: yupResolver(createObjFormSchema) });

    const [section, setSections] = useState([] as any[]);

    useEffect(() => {
      const getProfiles = async () => {
        var response = await api.get("/section");
        setSections(response.data);
      };
  
      getProfiles();
    }, []);

    const [faseCultivo, setFasesCultivo] = useState([] as any[]);

    useEffect(() => {
      const getFasesCultivo = async () => {
        var response = await api.get("/fase-cultivo");
        setFasesCultivo(response.data);
      };
  
      getFasesCultivo();
    }, []);
  
  
    const handleLoteSubmit: SubmitHandler<CreateGeneticProfileFormData> = async (
      formData
    ) => {
      try {
    
        const user = await api.post("location", formData);
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
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Cadastrar Local
            </Button>
          </Box>
  
    );
  }
  