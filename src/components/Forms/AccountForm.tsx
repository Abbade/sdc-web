import { yupResolver } from "@hookform/resolvers/yup";
import { Button } from "@mui/material";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";
import { useRouter } from "next/router";
import { useContext, useEffect, useState } from "react";
import { FieldError, SubmitHandler, useForm } from "react-hook-form";
import * as yup from "yup";
import { AlertContext } from "../../contexts/AlertContext";
import { EditInterface } from "../../interfaces/EditInterface";
import { api } from "../../services/apiClient";
import { withSSRAuth } from "../../utils/withSSRAuth";
import BasicSelect from "../Inputs/BasicSelect";
import BasicTextField from "../Inputs/BasicTextField";

type CreateFormData = {
  name: string;
  id?: number;
  email: string;
  password: string;
  id_role: number;
};
type RoleData = {
  id: number;
  name: string;
};

const createObjFormSchema = yup.object().shape({
  id: yup.number(),
  name: yup.string().required("Nome é obrigatório"),
  password: yup.string().required("Senha é obrigatória"),
  id_role: yup.number().required("Perfil é obrigatório"),
  email: yup
    .string()
    .required("E-mail é obrigatório")
    .email("Digite um e-mail válido"),
});

export default function AccountForm({ id, onClose }: EditInterface) {
  const router = useRouter();

  const {
    register,
    handleSubmit,
    control,
    setValue,
    formState: { errors, isSubmitting },
  } = useForm({ resolver: yupResolver(createObjFormSchema) });

  const { setAlert, setOpenLoading, showAlert } = useContext(AlertContext);
  const [roles, setRoles] = useState([] as RoleData[]);

  useEffect(() => {
    console.log("render edit " + id);
    const get = async (id) => {
      setOpenLoading(true);
      try {
        const rls = await api.get("roles");
        setRoles(rls.data.itens);

        if (id > 0) {
          // TODO MUDAR DPS TO DO     const item = await api.get(`user/${id}`);
          const item = await api.get(`user/${id}`);
          setValue("name", item.data.name);
          setValue("id", item.data.id);
          setValue("email", item.data.email);
          setValue("id_role", item.data.id_role);
          setValue("password", "******");
        }
        setOpenLoading(false);
      } catch (error) {
        // setAlert({
        //   message: error.response.data.message,
        //   alertType: 'error',
        //   openAlert: true,
        // });
        setOpenLoading(false);
      }
    };

    get(id);
  }, [id, setValue, setOpenLoading, setAlert]);

  const handleLoteSubmit: SubmitHandler<CreateFormData> = async (formData) => {
    try {
      setOpenLoading(true);
      if (formData.id > 0) {
        const item = await api.put("user", formData);
        setOpenLoading(false);
        showAlert("Perfil editado com sucesso.", "success");
      } else {
        const item = await api.post("user", formData);
        setOpenLoading(false);
        showAlert("Perfil cadastrado com sucesso.", "success");
      }
      onClose(true);
    } catch (error) {
      setOpenLoading(false);
      showAlert(error.response.data.message, "error");
    }
  };

  return (
    <Container component="main" maxWidth="xs">
      <Box
        component="form"
        noValidate
        onSubmit={handleSubmit(handleLoteSubmit)}
        sx={{ mt: 1 }}
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
          <Grid item xs={12} sm={12}>
            <BasicSelect
              label={"Perfil"}
              name={"id_role"}
              values={roles}
              control={control}
              error={errors.id_role as FieldError}
            />
          </Grid>
          <Grid item xs={12} sm={12}>
            <BasicTextField
              label={"Senha"}
              name={"password"}
              control={control}
              type={"password"}
              disabled={id != undefined}
              error={errors.password as FieldError}
            />
          </Grid>
        </Grid>

        <Button
          type="submit"
          fullWidth
          variant="contained"
          sx={{ mt: 3, mb: 2 }}
        >
          {id != undefined ? "Editar" : "Cadastrar"} Usuário
        </Button>
      </Box>
    </Container>
  );
}
export const getServerSideProps = withSSRAuth(
  async (ctx) => {
    return {
      props: {},
    };
  },
  {
    permissions: ["user.create"],
  }
);
