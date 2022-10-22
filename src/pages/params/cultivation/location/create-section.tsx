import {
  Container, createTheme, Typography
} from "@mui/material";



import CreateSectionForm from "../../../../components/Forms/params/CreateSectionForm";


const theme = createTheme();

export default function CreateLote() {
  

  return (
    <Container component="main" maxWidth="xs">
       <Typography component="h1" variant="h4" >
          Nova Seção
        </Typography>
      <CreateSectionForm></CreateSectionForm>
    </Container>
  );
}
