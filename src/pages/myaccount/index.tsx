import { yupResolver } from "@hookform/resolvers/yup";
import Brightness4Icon from '@mui/icons-material/Brightness4';
import Brightness7Icon from '@mui/icons-material/Brightness7';
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";
import IconButton from '@mui/material/IconButton';
import { useTheme } from "@mui/material/styles";
import Typography from "@mui/material/Typography";
import { useRouter } from "next/router";
import { useContext, useEffect } from "react";
import { FieldError, SubmitHandler, useForm } from "react-hook-form";
import * as yup from "yup";
import BasicTextField from "../../components/Inputs/BasicTextField";
import { AlertContext } from "../../contexts/AlertContext";
import { api } from "../../services/apiClient";
import { ColorModeContext } from "../../styles/Theme";
import { withSSRAuth } from "../../utils/withSSRAuth";

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

export default function MyAccount() {
  const router = useRouter();
  const {
    register,
    handleSubmit,
    control,
    setValue,
    formState: { errors, isSubmitting },
  } = useForm({ resolver: yupResolver(createObjFormSchema) });

  const { showAlert, showLoading, closeLoading } = useContext(AlertContext);

  const theme = useTheme();
  const colorMode = useContext(ColorModeContext);

  useEffect(() => {
    console.log("render ");
    const get = async () => {
      showLoading();

      const item = await api.get(`/me`);
      console.log(item.data);
      setValue("name", item.data.name);
      setValue("id", item.data.id);
      setValue("email", item.data.email);

      closeLoading();
    };

    get();
  }, []);

  const handleLoteSubmit: SubmitHandler<CreateFormData> = async (formData) => {
    try {
      showLoading();
      const item = await api.put("user", formData);
      closeLoading();
      showAlert("Conta Editada com sucesso.", "success");
    } catch (error) {
      closeLoading();
      showAlert(error.response.data.message, "error");
    }
  };

  return (
    <>
      <Container component="main" maxWidth="xs">
        <Typography component="h1" variant="h4">
          Minha Conta
        </Typography>
        <Box
          sx={{
            display: "flex",
            width: "100%",
            alignItems: "center",
            justifyContent: "center",
            bgcolor: "background.default",
            color: "text.primary",
            borderRadius: 1,
            p: 3,
          }}
        >
          {theme.palette.mode} mode
          <IconButton
            sx={{ ml: 1 }}
            onClick={colorMode.toggleColorMode}
            color="inherit"
          >
            {theme.palette.mode === "dark" ? (
              <Brightness7Icon />
            ) : (
              <Brightness4Icon />
            )}
          </IconButton>
        </Box>
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
            Editar Conta
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
  }
  // ,
  // {
  //   permissions: ["user.create"],
  // }
);
