import {
  Box, Button, createTheme, Grid
} from "@mui/material";
import * as yup from "yup";
  
  import { useContext, useEffect } from "react";
import { api } from "../../../services/apiClient";
  
  import { yupResolver } from "@hookform/resolvers/yup";
import {
  FieldError,
  SubmitHandler,
  useForm
} from "react-hook-form";
import { AlertContext } from "../../../contexts/AlertContext";
import { EditInterface } from "../../../interfaces/EditInterface";
import BasicTextField from "../../Inputs/BasicTextField";
  
  type CreateFaseCultivoForm = {
   id?: number;
   name: string;
   description: string;
   ordem: number;
  };
  
  const createObjFormSchema = yup.object().shape({
    name: yup.string().required("Nome é obrigatório"),
    description: yup.string().required("Descrição é obrigatório"),
    ordem: yup.number().required("Ordem da fase de cultivo é obrigatória"),
  });
  
  const theme = createTheme();
  
  export default function CreateFaseCultivoForm({ id, onClose }: EditInterface) {
    const {
      register,
      handleSubmit,
      control,
      setValue,
      formState: { errors, isSubmitting },
    } = useForm({ resolver: yupResolver(createObjFormSchema) });

    const { showAlert, setOpenLoading } = useContext(AlertContext);
  
    useEffect(() => {
      console.log("render edit " + id);
      try{
        const get = async (id) => {
          setOpenLoading(true);
          if (id > 0 ) {
            try {
              const item = await api.get(`fase-cultivo/${id}`);
              setValue("name", item.data.name);
              setValue("id", item.data.id);
              setValue("description", item.data.description);
              
              setValue("ordem", item.data.ordem);
              setOpenLoading(false);
            } catch (error) {
              console.log("CAIU");
              //showAlert(error.message, 'error');
              setOpenLoading(false);
            }         
          }
          setOpenLoading(false);

        };
    
        get(id);
      }catch(err){

      }
    
    }, [id, setValue, setOpenLoading]);
    const handleLoteSubmit: SubmitHandler<CreateFaseCultivoForm> = async (
      formData
    ) => {
      try {
        setOpenLoading(true);
        if(formData.id > 0){
          const item = await api.put("fase-cultivo", formData);
          showAlert('Fase cadastrada com sucesso.', 'success');
        }
        else{
          const item = await api.post("fase-cultivo", formData);
          showAlert('Fase editada com sucesso.', 'success');
        }

        onClose(true);
        setOpenLoading(false);
      } catch (error) {
        const errorOficial = error as Error;
        showAlert(errorOficial.message, 'error');
   
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
              <Grid item xs={12} sm={12}>
                <BasicTextField
                  label={"Ordem da Fase"}
                  name={"ordem"}
                  control={control}
                  error={errors.ordem as FieldError}
                />
              </Grid>
            </Grid>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Cadastrar Fase de Cultivo
            </Button>
          </Box>
  
    );
  }
  