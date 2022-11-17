import { yupResolver } from "@hookform/resolvers/yup";
import { Button } from "@mui/material";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import Router, { useRouter } from "next/router";
import { useContext, useEffect, useState } from "react";
import { FieldError, SubmitHandler, useForm } from "react-hook-form";
import * as yup from "yup";
import { AlertContext } from "../../contexts/AlertContext";
import { EditInterface } from "../../interfaces/EditInterface";
import { api } from "../../services/apiClient";
import BasicAutocomplete from "../../components/Inputs/BasicAutocompleteMultiple";
import BasicTextField from "../../components/Inputs/BasicTextField";
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import { withSSRAuth } from "../../utils/withSSRAuth";
import BasicSelect from "../../components/Inputs/BasicSelect";
import AccountForm from "../../components/Forms/AccountForm";

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
}

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

export default function CreateAccount() {
  const router = useRouter();
  const { id } = router.query;

  return (
    <Container component="main" maxWidth="xs">
      <AccountForm id={!isNaN(Number.parseInt(id.toString())) ? Number.parseInt(id.toString()) : undefined} onClose={() => router.back()}></AccountForm>
    </Container>
  );
}
export const getServerSideProps = withSSRAuth(async (ctx) => {
  return {
    props: {},
  };
}
, {
  permissions: ['user.create']
});