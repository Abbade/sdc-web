import {
  Container, Typography
} from "@mui/material";
import { useRouter } from 'next/router';
import RoleForm from "../../components/Forms/RoleForm";



export default function CreateRole() {
  const router = useRouter()
  const { id } = router.query;

  return (
    <Container component="main" maxWidth="xs">
       <Typography component="h1" variant="h4" >
          Novo Perfil
        </Typography>
      <RoleForm id={Number.parseInt(id?.toString())} />
    </Container>
  );
}
