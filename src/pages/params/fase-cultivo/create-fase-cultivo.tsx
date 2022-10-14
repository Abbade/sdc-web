import {
  Container, createTheme, Typography
} from "@mui/material";
import CreateFaseCultivoForm from "../../../components/Forms/params/CreateFaseCultivoForm";





const theme = createTheme();

export default function CreateLote() {
  

  return (
    <Container component="main" maxWidth="xs">
       <Typography component="h1" variant="h4" >
          Nova Fase de Cultivo
        </Typography>
      <CreateFaseCultivoForm></CreateFaseCultivoForm>
    </Container>
  );
}
