import {
  Box, Button, CardContent, Container, createTheme, Grid
} from "@mui/material";
import * as yup from "yup";

import { useContext, useEffect, useState } from "react";
import { api } from "../../services/apiClient";

import { yupResolver } from "@hookform/resolvers/yup";
import {
  FieldError,
  SubmitHandler,
  useForm
} from "react-hook-form";
import {
  FaseCultivo,
  Genetic,
  Location, Recipiente
} from "../../interfaces/LoteInterface";
import BasicDatePicker from "../Inputs/BasicDatePicker";
import BasicSelect from "../Inputs/BasicSelect";
import BasicTextField from "../Inputs/BasicTextField";
import { PlantaInterface } from "../../interfaces/PlantaInterface";
import { AlertContext } from "../../contexts/AlertContext";




type ChangePlantStageFormData = {
  plants: number[];
  obs: string;
  id_location: number;
  id_crop: number;
  cropFullDriedMass: number;
  cropDriedTrimMass: number;
  cropDriedFlowerMass: number;
  actionDate: Date;
}

const createObjFormSchema = yup.object().shape({

  actionDate: yup.date().required("Data obrigatória"),
  obs: yup.string().required("Observação obrigatória"),
  id_location: yup.number().required("Local de secagem obrigatório"),
  qtPacks: yup.number().required("Local de secagem obrigatório"),
  cropFullDriedMass: yup.number().required("Local de secagem obrigatório"),
  cropDriedTrimMass: yup.number().required("Local de secagem obrigatório"),
  cropDriedFlowerMass: yup.number().required("Local de secagem obrigatório")
});
const theme = createTheme();


export default function FinishCropForm(crop) {

  const {
    register,
    handleSubmit,
    control,
    formState: { errors, isSubmitting },
  } = useForm({ resolver: yupResolver(createObjFormSchema) });



  const [idCrop, setIdCrop] = useState()

  const [locations, setLocation] = useState(
    [] as Location[]
  );

  useEffect(() => {
    const getGenetics = async () => {
      // var response = await api.get("/genetic");

      // setGenetics(response.data.itens);
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
  useEffect(() => {
    console.log(crop)
    setIdCrop(crop.crop.id);
  }, [crop]);

  const { showAlert, setOpenLoading } = useContext(AlertContext);


  const handleLoteSubmit: SubmitHandler<ChangePlantStageFormData> = async (
    formData
  ) => {
    setOpenLoading(true);
    console.log("teste")
    try {

      formData.id_crop = idCrop


      const lote = await api.post("finish-crop", formData);
      showAlert("Colheita " + crop.name + " alterado com sucesso.", "success");
      setOpenLoading(false);

      // Router.push('/nursery/'+selectedLote.id)


    } catch (error) {
      const errorOficial = error as Error;
      showAlert(errorOficial.message, "error");

      setOpenLoading(false);

    }
  };


  return (
    <Container component="main" maxWidth="sm">
      <Box
        sx={{
          marginTop: 1,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <Grid item xs={12} sm={12}>
          Finalizar Colheita {crop?.name}
        </Grid>
        <Box
          component="form"
          noValidate
          onSubmit={handleSubmit(handleLoteSubmit)}
          sx={{ mt: 3 }}
        >
          <Grid container spacing={2} sm={12} xs={12}>

            <Grid item xs={12} sm={12} >
              <BasicDatePicker
                label={"Data de Embalagem"}
                name={"actionDate"}
                control={control}
                error={errors.actionDate as FieldError}
              />
            </Grid>
            <Grid item xs={12} sm={12}>
              <BasicSelect
                label={"Local de Armazenamento"}
                name={"id_location"}
                values={locations}
                control={control}
                error={errors.id_location as FieldError}
              />
            </Grid>
         
            <Grid item xs={12} sm={12}>
              <BasicTextField
                label={"Qtd. de Embalagens"}
                name={"qtPacks"}
                control={control}
                error={errors.qtPacks as FieldError}
              />
            </Grid>
            <Grid item xs={12} sm={12}>
              <BasicTextField
                label={"Massa Seca Total"}
                name={"cropFullDriedMass"}
                control={control}
                error={errors.cropFullDriedMass as FieldError}
              />
            </Grid>

            <Grid item xs={12} sm={12}>
              <BasicTextField
                label={"Massa Seca Debulhada"}
                name={"cropDriedFlowerMass"}
                control={control}
                error={errors.cropDriedFlowerMass as FieldError}
              />
            </Grid>

            <Grid item xs={12} sm={12}>
              <BasicTextField
                label={"Massa Descartada"}
                name={"cropDriedTrimMass"}
                control={control}
                error={errors.cropDriedTrimMass as FieldError}
              />
            </Grid>

            <Grid item xs={12} sm={12}>
              <BasicTextField
                label={"obs"}
                name={"obs"}
                multiline={true}
                control={control}
                error={errors.obs as FieldError}
              />
            </Grid>
          </Grid>

          <Grid container spacing={2} sm={6} xs={6}>
          </Grid>

          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
          >
            Colher Planta(s)
          </Button>
        </Box>
       
      </Box>
    </Container>
  );
}
