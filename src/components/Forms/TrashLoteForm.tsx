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

import { api } from "../../services/apiClient";
import Router from "next/router";
import React, { useEffect, useState } from "react";

import BasicDatePicker from "../Inputs/BasicDatePicker";
import BasicSelect from "../Inputs/BasicSelect";
import BasicTextField from "../Inputs/BasicTextField";
import {
  Genetic,
  LoteInterface,
  PropagationType,
  TrashReason,
} from "../../interfaces/LoteInterface";
import {
  Controller,
  FieldError,
  SubmitHandler,
  useForm,
} from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";

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


export default function TrashLoteForm(selectedLote) {
 
  const {
    register,
    handleSubmit,
    control,
    formState: { errors, isSubmitting },
  } = useForm({ resolver: yupResolver(createObjFormSchema) });

  
  const [idLote, setIdLote] = useState(0)

  const [trashReason, setTrashReason] = useState(
    [] as TrashReason[]
  );

  useEffect(() => {
    const getTrashReasons = async () => {
      var response = await api.get("/trash-reason");
      setTrashReason(response.data);
    };
    getTrashReasons();
  }, []);

  useEffect(() => {
    setIdLote(selectedLote.selectedLote.id)


  },[selectedLote])



  const handleLoteSubmit: SubmitHandler<TrashLoteFormData> = async (
    formData
  ) => {
    try {
      formData.idLote = idLote;
      console.log(formData)

      const lote = await api.put("trash-lote", formData);
      // Router.push('/nursery/'+selectedLote.id)

      
    } catch (error) {
      const errorOficial = error as Error;
      console.log(error as Error);
    }
  };

  return (
    <Container component="main" maxWidth="xs">
      <Box
        sx={{
          marginTop: 1,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        
        <Box
          component="form"
          noValidate
          onSubmit={handleSubmit(handleLoteSubmit)}
          sx={{ mt: 3 }}
        >
          <Grid container spacing={2}>
            <Grid item xs={12} sm={12}>
              <BasicDatePicker
                label={"Data de Descarte"}
                name={"trashDate"}
                control={control}
                error={errors.trashDate as FieldError}
              />
            </Grid>

            <Grid item xs={12} sm={12}>
              <BasicTextField
                label={"Quantidade  (" + selectedLote.selectedLote.qtProp + " Disponíveis)"}
                name={"qtTrash"}
                control={control}
                error={errors.qtTrash as FieldError}
              />
            </Grid>

            <Grid item xs={12} sm={12}>
              <BasicSelect
                label={"Trash Reason"}
                name={"id_trashReason"}
                values={trashReason}
                control={control}
                error={errors.id_trashReason as FieldError}
              />
            </Grid>
            <Grid item xs={12} sm={12}>
              <BasicTextField
                label={"obs"}
                name={"obs"}
                control={control}
                error={errors.obs as FieldError}
              />
            </Grid>
          </Grid>
          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
          >
            Descartar Estacas
          </Button>
        </Box>
      </Box>
    </Container>
  );
}
