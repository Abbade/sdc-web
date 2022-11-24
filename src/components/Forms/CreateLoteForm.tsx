import { Box, Button, Grid } from "@mui/material";
import * as yup from "yup";
import Router from "next/router";
import { useContext, useEffect, useState } from "react";
import { api } from "../../services/apiClient";
import { yupResolver } from "@hookform/resolvers/yup";
import { FieldError, SubmitHandler, useForm } from "react-hook-form";
import { Genetic, PropagationType } from "../../interfaces/LoteInterface";
import BasicDatePicker from "../Inputs/BasicDatePicker";
import BasicSelect from "../Inputs/BasicSelect";
import BasicTextField from "../Inputs/BasicTextField";
import { AlertContext, showAlert } from "../../contexts/AlertContext";

type CreateLoteFormData = {
  id_propagationType: number;
  id_genetic: number;
  id_location_init: number;
  qtTotal: number;
  obs: string;
  propDate: Date;
};

const createObjFormSchema = yup.object().shape({
  propDate: yup.date().required("Data obrigatória"),
  obs: yup.string().required("Observação obrigatória"),
  id_propagationType: yup.number().required("Tipo de propagação é obrigatório"),
  id_genetic: yup.number().required("Genética é obrigatório"),
  id_location_init: yup.number().required("Localização é obrigatória"),
  qtTotal: yup.number().required("Quantidade total é obrigatória"),
});

export default function CreateLoteForm() {
  const {
    register,
    handleSubmit,
    control,
    formState: { errors, isSubmitting },
  } = useForm({ resolver: yupResolver(createObjFormSchema) });

  const [propagationType, setPropagationType] = useState(
    [] as PropagationType[]
  );
  const [location, setLocation] = useState([] as Location[]);

  useEffect(() => {
    const getPropagationTypes = async () => {
      var response = await api.get("/propagation-type");
      setPropagationType(response.data.itens);
    };

    getPropagationTypes();
  }, []);

  const [genetic, setGenetics] = useState([] as Genetic[]);

  useEffect(() => {
    const getGenetics = async () => {
      var response = await api.get("/genetic");
      setGenetics(response.data.itens);
    };

    getGenetics();
  }, []);

  useEffect(() => {
    const getLocations = async () => {
      var response = await api.get("/location");
      setLocation(response.data.itens);
    };

    getLocations();
  }, []);

  const { showAlert, setOpenLoading } = useContext(AlertContext);

  const handleLoteSubmit: SubmitHandler<CreateLoteFormData> = async (
    formData
  ) => {
      setOpenLoading(true);
      try {

        const user = await api.post("lote", formData);

      showAlert("Lote cadastrado com sucesso.", "success");
      setOpenLoading(false);

      // Router.back();
    } catch (error) {
        const errorOficial = error as Error;
      setOpenLoading(false);
      showAlert(errorOficial.message, "error");


    }
  };

  return (
    <Box
      component="form"
      noValidate
      onSubmit={handleSubmit(handleLoteSubmit)}
      sx={{ mt: 3 }}
    >
      <Grid container spacing={2}>
        <Grid item xs={12} sm={12}>
          <BasicSelect
            label={"Genética"}
            name={"id_genetic"}
            values={genetic}
            control={control}
            error={errors.id_genetic as FieldError}
          />
        </Grid>
        <Grid item xs={12} sm={12}>
          <BasicDatePicker
            label={"Data de Propagação"}
            name={"propDate"}
            control={control}
            error={errors.propDate as FieldError}
          />
        </Grid>

        <Grid item xs={12} sm={12}>
          <BasicSelect
            label={"Tipo de Propagação"}
            name={"id_propagationType"}
            values={propagationType}
            control={control}
            error={errors.id_propagationType as FieldError}
          />
        </Grid>

        <Grid item xs={12} sm={12}>
          <BasicSelect
            label={"Origem"}
            control={control}
            name={"id_origem"}
            error={errors.id_origem as FieldError}
          />
        </Grid>

        <Grid item xs={12} sm={12}>
          <BasicSelect
            label={"Local"}
            name={"id_location_init"}
            values={location}
            control={control}
            error={errors.id_location_init as FieldError}
          />
        </Grid>
        <Grid item xs={12} sm={12}>
          <BasicTextField
            label={"Quantidade"}
            name={"qtTotal"}
            control={control}
            error={errors.qtTotal as FieldError}
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
      <Button type="submit" fullWidth variant="contained" sx={{ mt: 3, mb: 2 }}>
        Cadastrar Lote
      </Button>
    </Box>
  );
}
