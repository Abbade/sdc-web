import {
  Box, Button, createTheme, Grid
} from "@mui/material";
import * as yup from "yup";
  
  import Router from "next/router";
import { api } from "../../../services/apiClient";
  
  import { yupResolver } from "@hookform/resolvers/yup";
import {
  FieldError,
  SubmitHandler,
  useForm
} from "react-hook-form";
import BasicTextField from "../../Inputs/BasicTextField";
  
  type CreateGeneticProfileFormData = {
   name: string;
   description: string;
  };
  
  const createObjFormSchema = yup.object().shape({
    name: yup.string().required("Nome é obrigatório"),
    description: yup.string().required("Descrição é obrigatório"),
  });
  
  const theme = createTheme();
  
  export default function CreateTrashReasonForm() {
    const {
      register,
      handleSubmit,
      control,
      formState: { errors, isSubmitting },
    } = useForm({ resolver: yupResolver(createObjFormSchema) });


  
    const handleLoteSubmit: SubmitHandler<CreateGeneticProfileFormData> = async (
      formData
    ) => {
      try {
    
        const user = await api.post("trash-reason", formData);
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
              Cadastrar Motivo de Descarte
            </Button>
          </Box>
  
    );
  }
  