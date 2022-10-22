import {
  Container, createTheme, Typography
} from "@mui/material";
import CreateRecipienteForm from "../../../../components/Forms/params/CreateRecipienteForm";





const theme = createTheme();

export default function CreateLote() {
  

  return (
    <Container component="main" maxWidth="xs">
       <Typography component="h1" variant="h4" >
          Novo Recipiente
        </Typography>
      <CreateRecipienteForm></CreateRecipienteForm>
    </Container>
  );
}
