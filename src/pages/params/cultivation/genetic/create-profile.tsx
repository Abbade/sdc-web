import {
  Container, createTheme, Typography
} from "@mui/material";



import CreateGeneticProfileForm from "../../../../components/Forms/params/CreateGeneticProfileForm";


const theme = createTheme();

export default function CreateLote() {
  

  return (
    <Container component="main" maxWidth="xs">
       <Typography component="h1" variant="h4" >
          Novo Perfil Genético
        </Typography>
      <CreateGeneticProfileForm></CreateGeneticProfileForm>
    </Container>
  );
}
