import {
  Container, createTheme, Typography
} from "@mui/material";
import CreateGeneticForm from "../../../../components/Forms/params/CreateGeneticForm";





const theme = createTheme();

export default function CreateGenetic() {
  

  return (
    <Container component="main" maxWidth="xs">
       <Typography component="h1" variant="h4" >
          Nova Genética
        </Typography>
      <CreateGeneticForm></CreateGeneticForm>
    </Container>
  );
}
