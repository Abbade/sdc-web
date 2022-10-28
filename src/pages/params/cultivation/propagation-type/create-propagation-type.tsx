import {
  Container, createTheme, Typography
} from "@mui/material";
import { useRouter } from 'next/router';
import CreatePropagationTypeForm from "../../../../components/Forms/params/CreatePropagationTypeForm";




const theme = createTheme();

export default function CreateLote() {
  const router = useRouter()
  const { id } = router.query;

  console.log(id);

  return (
    <Container component="main" maxWidth="xs">
       <Typography component="h1" variant="h4" >
          Nova Forma de Propagação
        </Typography>
      <CreatePropagationTypeForm id={Number.parseInt(id?.toString())}></CreatePropagationTypeForm>
    </Container>
  );
}
