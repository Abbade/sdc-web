import { yupResolver } from "@hookform/resolvers/yup";
import { Button } from "@mui/material";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import Router from "next/router";
import { useContext, useEffect, useState } from "react";
import { FieldError, SubmitHandler, useForm } from "react-hook-form";
import * as yup from "yup";
import { AlertContext } from "../../contexts/AlertContext";
import { EditInterface } from "../../interfaces/EditInterface";
import { api } from "../../services/apiClient";
import BasicAutocomplete from "../Inputs/BasicAutocompleteMultiple";
import BasicTextField from "../Inputs/BasicTextField";

type CreateFormData = {
  name: string;
  id?: number;
  email: string;
  password: string;
};

const createObjFormSchema = yup.object().shape({
  id: yup.number(),
  name: yup.string().required("Nome é obrigatório"),
  password: yup.string().required("Senha é obrigatória"),
  email: yup
    .string()
    .required("E-mail é obrigatório")
    .email("Digite um e-mail válido"),
});

export default function UserForm({ id }: EditInterface) {
  const {
    register,
    handleSubmit,
    control,
    setValue,
    formState: { errors, isSubmitting },
  } = useForm({ resolver: yupResolver(createObjFormSchema) });

  const { setAlert, setOpenLoading } = useContext(AlertContext);

  useEffect(() => {
    console.log("render edit");
    const get = async (id) => {
  
      if (id > 0) {
        const item = await api.get(`user/${id}`);
        setValue("name", item.data.name);
        setValue("id", item.data.id);
        setValue("id", item.data.email);
        setValue("password", item.data.password);
  
      }
    };

    get(id);
  }, [id, setValue]);

  const handleObjSubmit: SubmitHandler<CreateFormData> = async (formData) => {
    try {
      setOpenLoading(true);
      if (formData.id > 0) {
        const item = await api.put("user", formData);
        setOpenLoading(false);
        setAlert({
          message: 'Perfil editado com sucesso.',
          alertType: "success",
          openAlert: true,
        });
      } else {
        const item = await api.post("user", formData);
        setOpenLoading(false);
        setAlert({
          message: 'Perfil cadastrado com sucesso.',
          alertType: "success",
          openAlert: true,
        });
      }
      Router.back();
    } catch (error) {
      setOpenLoading(false);
      setAlert({
        message: error.response.data.message,
        alertType: "error",
        openAlert: true,
      });
    }
  };

  return (
    <Box
        component="form"
        noValidate
        onSubmit={handleSubmit(handleObjSubmit)}
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
          <Grid item xs={12} sm={12}>
            <BasicTextField
              label={"Senha"}
              name={"password"}
              control={control}
              type={"password"}
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
  );
}
