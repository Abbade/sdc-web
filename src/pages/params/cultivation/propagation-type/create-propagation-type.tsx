import {
  Container, createTheme, Typography
} from "@mui/material";



import CreateGeneticProfileForm from "../../../components/Forms/params/CreateGeneticProfileForm";
import CreateLocationForm from "../../../components/Forms/params/CreateLocationForm";
import CreatePropagationTypeForm from "../../../components/Forms/params/CreatePropagationTypeForm";


const theme = createTheme();

export default function CreateLote() {
  

  return (
    <Container component="main" maxWidth="xs">
       <Typography component="h1" variant="h4" >
          Nova Forma de Propagação
        </Typography>
      <CreatePropagationTypeForm></CreatePropagationTypeForm>
    </Container>
  );
}
