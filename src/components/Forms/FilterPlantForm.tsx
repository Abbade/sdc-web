import { Box, Button, Container, createTheme, Grid } from "@mui/material";
import * as yup from "yup";

import { useCallback, useContext, useEffect, useState } from "react";
import { api } from "../../services/apiClient";

import { yupResolver } from "@hookform/resolvers/yup";
import { FieldError, SubmitHandler, useForm } from "react-hook-form";
import { FaseCultivo, Genetic, Location, Recipiente } from "../../interfaces/LoteInterface";
import BasicDatePicker from "../Inputs/BasicDatePicker";
import BasicSelect from "../Inputs/BasicSelect";
import BasicTextField from "../Inputs/BasicTextField";
import { FilterProp, PlantsContext } from "../../contexts/PlantsContext";
import { AlertContext } from "../../contexts/AlertContext";



const createObjFormSchema = yup.object().shape({
  // id_lote: yup.number().required("Genética é obrigatório"),
  ids: yup.string(),
  totalFilter: yup.number(),
  idLote: yup.number(),
  idGenetic: yup.number(),
  idRecipiente: yup.number(),
  idFaseCultivo: yup.number(),
  propagationDate: yup.date(),
  aclimatationDate: yup.date(),
  vegetationDate: yup.date(),
  floweringDate: yup.date(),

});
interface FilterPlant {
  onClose : () => void;
}
export default function FilterPlantForm({onClose} : FilterPlant) {
  const {
    handleSubmit,
    control,
    setValue,
    formState: { errors, isSubmitting },
    reset
  } = useForm({ resolver: yupResolver(createObjFormSchema) });



  const [recipiente, setRecipiente] = useState([] as Recipiente[]);
  const [faseCultivo, setFaseCultivo] = useState([] as FaseCultivo[]);
  const [genetic, setGenetic] = useState([] as Genetic[]);
  const [location, setLocation] = useState([] as Location[]);
  const { filter, setFilter} = useContext(PlantsContext);
  const { setOpenLoading} = useContext(AlertContext);

  useEffect(() => {
    console.log("render planta");
    const getRecipientes = async () => {
      setOpenLoading(true);
      var response = await api.get("/recipiente");
      setRecipiente(response.data.itens);
      if(filter?.idRecipiente > 0){
        setValue("idRecipiente", filter.idRecipiente);
      }
      setOpenLoading(false);
    };
    const getLocations = async () => {
      setOpenLoading(true);
      var response = await api.get("/location");
      setLocation(response.data.itens);
      if(filter?.idLocation > 0){
        setValue("idLocation", filter.idLocation);
      }
      setOpenLoading(false);
    };

    const getFasesCultivo = async () => {
      setOpenLoading(true);
      var response = await api.get("/fase-cultivo");
      setFaseCultivo(response.data.itens);
      if(filter?.idFaseCultivo > 0){
        setValue("idFaseCultivo", filter.idFaseCultivo);
      }
      setOpenLoading(false);
    };

    const getGenetics = async () => {
      setOpenLoading(true);
      var response = await api.get("/genetic");
      setGenetic(response.data.itens);
      if(filter?.idGenetic > 0){
        setValue("idGenetic", filter.idGenetic);
      }
      setOpenLoading(false);
    };

    if(filter?.ids) {
      setValue("ids",filter.ids)
    }

    if(filter?.propagationDate) {
      setValue("propagationDate",filter.propagationDate)
    }

    if(filter?.aclimatationDate) {
      setValue("aclimatationDate",filter.aclimatationDate)
    }

    if(filter?.vegetationDate) {
      setValue("vegetationDate",filter.vegetationDate)
    }

    if(filter?.floweringDate) {
      setValue("floweringDate",filter.floweringDate)
    }

    getRecipientes();
    getLocations();
    getFasesCultivo();
    getGenetics();

  }, [filter, setOpenLoading, setValue]);

  const handleLoteSubmit: SubmitHandler<FilterProp> = async (formData) => {
    try {
      formData.totalFilter = 0;
      formData.totalFilter = formData.ids?.toString()?.length > 0 ? formData.totalFilter + 1: formData.totalFilter;
      formData.totalFilter = formData.idFaseCultivo?.toString()?.length > 0 ? formData.totalFilter + 1: formData.totalFilter;
      formData.totalFilter = formData.idGenetic?.toString()?.length > 0 ? formData.totalFilter + 1 : formData.totalFilter;
      formData.totalFilter = formData.idLocation?.toString()?.length > 0 ? formData.totalFilter + 1 : formData.totalFilter;
      formData.totalFilter = formData.idLote?.toString()?.length > 0 ? formData.totalFilter + 1: formData.totalFilter;
      formData.totalFilter = formData.idRecipiente?.toString()?.length > 0 ? formData.totalFilter + 1 : formData.totalFilter;
      formData.totalFilter = formData.propagationDate?.toString()?.length > 0 ? formData.totalFilter + 1: formData.totalFilter;
      formData.totalFilter = formData.aclimatationDate?.toString()?.length > 0 ? formData.totalFilter + 1: formData.totalFilter;
      formData.totalFilter = formData.vegetationDate?.toString()?.length > 0 ? formData.totalFilter + 1: formData.totalFilter;
      formData.totalFilter = formData.floweringDate?.toString()?.length > 0 ? formData.totalFilter + 1: formData.totalFilter;

      console.log("FORM");
      console.log(formData);
      setFilter(formData);
      onClose();
    } catch (error) {
      const errorOficial = error as Error;
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
          <BasicTextField
            label={"Código(s)"}
            name={"ids"}
            multiline={true}
            control={control}
            error={errors.ids as FieldError}
          />
        </Grid>
            <Grid item xs={12} sm={12}>
              <BasicSelect
                label={"Location"}
                name={"idLocation"}
                values={location}
                control={control}
                error={errors.id_location as FieldError}
              />
            </Grid>
            <Grid item xs={12} sm={12}>
              <BasicSelect
                label={"Recipiente"}
                name={"idRecipiente"}
                values={recipiente}
                control={control}
                error={errors.id_recipiente as FieldError}
              />
            </Grid>
            <Grid item xs={12} sm={12}>
              <BasicSelect
                label={"Genetica"}
                name={"idGenetic"}
                values={genetic}
                control={control}
                error={errors.id_genetic as FieldError}
              />
            </Grid>
            <Grid item xs={12} sm={12}>
              <BasicSelect
                label={"Fase de Cultivo"}
                name={"idFaseCultivo"}
                values={faseCultivo}
                control={control}
                error={errors.id_faseCultivo as FieldError}
              />
            </Grid>
            <Grid item xs={12} sm={12}>
              <BasicDatePicker
                label={"Data de Propagação"}
                name={"propagationDate"}
                control={control}
                error={errors.propagationDate as FieldError}
              />
            </Grid>
            <Grid item xs={12} sm={12}>
              <BasicDatePicker
                label={"Data de Aclimatação"}
                name={"aclimatationDate"}
                control={control}
                error={errors.aclimatationDate as FieldError}
              />
            </Grid>
            <Grid item xs={12} sm={12}>
              <BasicDatePicker
                label={"Data de Vegetação"}
                name={"vegetationDate"}
                control={control}
                error={errors.vegetationDate as FieldError}
              />
            </Grid>
            <Grid item xs={12} sm={12}>
              <BasicDatePicker
                label={"Data de Floração"}
                name={"floweringDate"}
                control={control}
                error={errors.floweringDate as FieldError}
              />
            </Grid>
          </Grid>
          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
          >
            Filtrar
          </Button>
          <Button
            type="reset"
            onClick={() => {
              reset()
            }}
            fullWidth
            variant="contained"
            sx={{ mt: 1, mb: 2 }}
          >
            Limpar Filtros
          </Button>
        </Box>
      </Box>
    </Container>
  );
}
