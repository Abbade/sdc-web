import { Box, Button, Container, createTheme, Grid } from "@mui/material";
import * as yup from "yup";

import { useContext, useEffect, useState } from "react";
import { api } from "../../services/apiClient";

import { yupResolver } from "@hookform/resolvers/yup";
import { FieldError, SubmitHandler, useForm } from "react-hook-form";
import { Location, Recipiente } from "../../interfaces/LoteInterface";
import BasicDatePicker from "../Inputs/BasicDatePicker";
import BasicSelect from "../Inputs/BasicSelect";
import BasicTextField from "../Inputs/BasicTextField";
import { FilterProp, PlantsContext } from "../../contexts/PlantsContext";
import { AlertContext } from "../../contexts/AlertContext";



const createObjFormSchema = yup.object().shape({
  // id_lote: yup.number().required("Genética é obrigatório"),
  totalFilter: yup.number(),
  idLote: yup.number(),
  idGenetic: yup.number(),
  idRecipiente: yup.number(),
  idFaseCultivo: yup.number(),
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
  } = useForm({ resolver: yupResolver(createObjFormSchema) });

  const [recipiente, setRecipiente] = useState([] as Recipiente[]);
  const [location, setLocation] = useState([] as Location[]);
  const { filter, setFilter} = useContext(PlantsContext);
  const {showLoading, closeLoading} = useContext(AlertContext);

  useEffect(() => {

    const getRecipientes = async () => {
      showLoading();
      var response = await api.get("/recipiente");
      setRecipiente(response.data);
      if(filter?.idRecipiente > 0){
        setValue("idRecipiente", filter.idRecipiente);
      }
      closeLoading();
    };
    const getLocations = async () => {
      showLoading();
      var response = await api.get("/location");
      setLocation(response.data);
      if(filter?.idLocation > 0){
        setValue("idLocation", filter.idLocation);
      }
      closeLoading();
    };

    getRecipientes();
    getLocations();

  }, [filter]);

  const handleLoteSubmit: SubmitHandler<FilterProp> = async (formData) => {
    try {
      formData.totalFilter = 0;
      formData.totalFilter = formData.idFaseCultivo?.toString()?.length > 0 ? formData.totalFilter + 1: formData.totalFilter;
      formData.totalFilter = formData.idGenetic?.toString()?.length > 0 ? formData.totalFilter + 1 : formData.totalFilter;
      formData.totalFilter = formData.idLocation?.toString()?.length > 0 ? formData.totalFilter + 1 : formData.totalFilter;
      formData.totalFilter = formData.idLote?.toString()?.length > 0 ? formData.totalFilter + 1: formData.totalFilter;
      formData.totalFilter = formData.idRecipiente?.toString()?.length > 0 ? formData.totalFilter + 1 : formData.totalFilter;
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
          </Grid>
          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
          >
            Filtrar
          </Button>
        </Box>
      </Box>
    </Container>
  );
}
