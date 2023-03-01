import { ThemeProvider } from "@emotion/react";
import {
  Typography,
  createTheme,
  Container,

} from "@mui/material";
import Link from "next/link";
import * as yup from "yup";

import { api } from "../../services/apiClient";
import Router from "next/router";
import React, { useEffect, useState } from "react";


import {
  Genetic,
  PropagationType,
} from "../../interfaces/LoteInterface";
import CreateLoteForm from "../../components/Forms/action/CreateLoteForm";




export default function CreateLote() {
  

  return (
    <Container component="main" maxWidth="xs">
       <Typography component="h1" variant="h4" >
          Novo Lote
        </Typography>
      <CreateLoteForm></CreateLoteForm>
    </Container>
  );
}
