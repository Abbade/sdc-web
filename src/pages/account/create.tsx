import Container from "@mui/material/Container";
import { useRouter } from "next/router";
import * as yup from "yup";
import AccountForm from "../../components/Forms/AccountForm";
import { withSSRAuth } from "../../utils/withSSRAuth";

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
      <AccountForm id={!isNaN(Number.parseInt(id?.toString())) ? Number.parseInt(id.toString()) : undefined} onClose={() => router.back()}></AccountForm>
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