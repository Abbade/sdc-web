import { yupResolver } from "@hookform/resolvers/yup";
import { Button } from "@mui/material";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import { useRouter } from "next/router";
import { useContext, useEffect } from "react";
import { FieldError, SubmitHandler, useForm } from "react-hook-form";
import * as yup from "yup";
import GeneralConfigTab from "../../components/GeneralConfigsTab";
import BasicTextField from "../../components/Inputs/BasicTextField";
import { AlertContext } from "../../contexts/AlertContext";
import { api } from "../../services/apiClient";
import { withSSRAuth } from "../../utils/withSSRAuth";
import * as React from 'react';
import IconButton from '@mui/material/IconButton';
import { useTheme, ThemeProvider, createTheme } from '@mui/material/styles';
import Brightness4Icon from '@mui/icons-material/Brightness4';
import Brightness7Icon from '@mui/icons-material/Brightness7';

type CreateFormData = {
  name: string;
  id?: number;
  email: string;
};

const createObjFormSchema = yup.object().shape({
  id: yup.number(),
  name: yup.string().required("Nome é obrigatório"),
  email: yup
    .string()
    .required("E-mail é obrigatório")
    .email("Digite um e-mail válido"),
});

export default function CompanyUpdate() {
  const router = useRouter();
  const {
    register,
    handleSubmit,
    control,
    setValue,
    formState: { errors, isSubmitting },
  } = useForm({ resolver: yupResolver(createObjFormSchema) });

  const { showAlert, setOpenLoading } = useContext(AlertContext);

  useEffect(() => {
    console.log("render ");
    const get = async () => {

      setOpenLoading(true);

      const item = await api.get(`company/${1}`);
      setValue("name", item.data.name);
      setValue("id", item.data.id);
      setValue("email", item.data.email);
      
      setOpenLoading(false);
    };

    get();
  }, [setOpenLoading, setValue]);

  const handleLoteSubmit: SubmitHandler<CreateFormData> = async (formData) => {
    try {

      setOpenLoading(true);
      const item = await api.put("company", formData);
      setOpenLoading(false);
      showAlert("Empresa Editada com sucesso.", "success");

    } catch (error) {
      setOpenLoading(false);
      showAlert(error.response.data.message, "error");
    }
  };

  return (
    <>
      <GeneralConfigTab index={0} />
      <Container component="main" maxWidth="xs">
 
        <Typography component="h1" variant="h4">
          Empresa
        </Typography>
        <Box
          component="form"
          noValidate
          onSubmit={handleSubmit(handleLoteSubmit)}
          sx={{ mt: 3 }}
        >
          <Grid container spacing={2} >
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
                label={"E=mail"}
                name={"email"}
                control={control}
                error={errors.email as FieldError}
              />
            </Grid>
          </Grid>

          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
          >
            Editar Empresa
          </Button>
        </Box>
      </Container>
    </>
    
  );
}
export const getServerSideProps = withSSRAuth(
  async (ctx) => {
    return {
      props: {},
    };
  },
  {
    permissions: ["company.create"],
  }
);
