import { ThemeProvider } from "@emotion/react";
import {
  Typography,
  createTheme,
  Container,
  CssBaseline,
  Box,
  Avatar,
  Grid,
  TextField,
  FormControlLabel,
  Checkbox,
  Button,
  TextFieldProps,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
} from "@mui/material";
import Link from "next/link";
import * as yup from "yup";
import { useRouter } from 'next/router'

import { api } from "../../../services/apiClient";
import Router from "next/router";
import React, { useEffect, useState } from "react";

import BasicDatePicker from "../../../components/Inputs/BasicDatePicker";
import BasicSelect from "../../../components/Inputs/BasicSelect";
import BasicTextField from "../../../components/Inputs/BasicTextField";
import {
  Genetic,
  LoteInterface,
  PropagationType,
  TrashReason,
} from "../../../interfaces/LoteInterface";
import {
  Controller,
  FieldError,
  SubmitHandler,
  useForm,
} from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import TrashLoteForm from "../../../components/Forms/TrashLoteForm";
import { withSSRAuth } from "../../../utils/withSSRAuth";

type TrashLoteFormData = {
  idLote: number;
  id_trashReason: number;
  qtTrash: number;
  obs: string;
  trashDate: Date;
};

const createObjFormSchema = yup.object().shape({
  trashDate: yup.date().required("Data obrigatória"),
  obs: yup.string().required("Observação obrigatória"),
  id_trashReason: yup.number().required("Genética é obrigatório"),
  qtTrash: yup.number().required("Quantidade total é obrigatória"),
});
const theme = createTheme();


export default function TrashLote() {

  const {
    register,
    handleSubmit,
    control,
    formState: { errors, isSubmitting },
  } = useForm({ resolver: yupResolver(createObjFormSchema) });


  const [trashReason, setTrashReason] = useState(
    [] as TrashReason[]
  );

  const routing = useRouter()
  const [idLote, setIdLote] = useState(Number.parseInt(routing.asPath.split("/")[2]))

  const [selectedLote, setSelectedLote] = useState({} as LoteInterface)







  useEffect(() => {
    console.log(idLote)

    const getLotes = async () => {
      var response = await api.get("/lote", idLote ? { params: { id: idLote } } : {});
      console.log(response.data)
      console.log(response.data.itens[0])
      setSelectedLote(response.data.itens[0]);
      setIdLote(Number.parseInt(routing.asPath.split("/")[2]))
    };
    
    getLotes()

  }, [routing.asPath, routing.isReady]);



  return (
    <Container component="main" maxWidth="md">

      <Box
        sx={{
          marginTop: 1,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
              <Typography component="h1" variant="h5">
          Descartar Estacas: {selectedLote.name}
        </Typography>
        <TrashLoteForm selectedLote={selectedLote}></TrashLoteForm>
      </Box>
    </Container>
  );
}

export const getServerSideProps = withSSRAuth(async (ctx) => {

  return {
    props: {

    }
  }
})