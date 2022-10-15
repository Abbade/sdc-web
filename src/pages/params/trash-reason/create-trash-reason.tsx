import {
  Container, createTheme, Typography
} from "@mui/material";
import React from "react";
import CreateTrashReasonForm from "../../../components/Forms/params/CreateTrashReasonForm";





const theme = createTheme();

export default function CreateTrashReason() {


  return (
    <Container component="main" maxWidth="xs">
      <Typography component="h1" variant="h4" >
        Novo Motivo de Descarte
      </Typography>
      <CreateTrashReasonForm></CreateTrashReasonForm>
    </Container>
  );
}
