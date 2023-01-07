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
  cropFullWetMass: number;
  cropWetTrimMass: number;
  cropFlowerWetMass: number;
  actionDate: Date;
}

const createObjFormSchema = yup.object().shape({

  actionDate: yup.date().required("Data obrigatória"),
  obs: yup.string().required("Observação obrigatória"),
  id_location: yup.number().required("Local de secagem obrigatório"),
  cropFullWetMass: yup.number().required("Local de secagem obrigatório"),
  cropWetTrimMass: yup.number().required("Local de secagem obrigatório"),
  cropFlowerWetMass: yup.number().required("Local de secagem obrigatório")
});
const theme = createTheme();


export default function CreateCropForm(plants) {

  const {
    register,
    handleSubmit,
    control,
    formState: { errors, isSubmitting },
  } = useForm({ resolver: yupResolver(createObjFormSchema) });

  

  const [idPlants, setIdPlants] = useState([] as number[])

 

  const [genetics, setGenetics] = useState(
    [] as Genetic[]
  );

  const [locations, setLocation] = useState(
    [] as Genetic[]
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
    console.log(plants.plants)
    if(plants.plants.length > 0) {
      setIdPlants(plants.plants.map((plant) => {
        setGenetics([plant?.genetic])
        // control['id_genetic'].setValue(plant.id_genetic)
        console.log(control._fields)
        console.log(genetics)
        return plant.id
      }))
  
    }
    

  }, [plants])

  const { showAlert, setOpenLoading } = useContext(AlertContext);


  const handleLoteSubmit: SubmitHandler<ChangePlantStageFormData> = async (
    formData
  ) => {
  setOpenLoading(true);
    console.log("teste")
    try {

      formData.plants = idPlants


      const lote = await api.post("create-crop", formData);
  showAlert(idPlants?.length + "planta(s) alterada(s) com sucesso.", "success");
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
           Nova Colheita de {genetics[0]?.nick}
            </Grid> 
        <Box
          component="form"
          noValidate
          onSubmit={handleSubmit(handleLoteSubmit)}
          sx={{ mt: 3 }}
        >
          <Grid container spacing={2} sm={6} xs={12}>
  
            <Grid item xs={12} sm={12} >
              <BasicDatePicker
                label={"Data de Colheita"}
                name={"actionDate"}
                control={control}
                error={errors.actionDate as FieldError}
              />
            </Grid>
            <Grid item xs={12} sm={12}>
          <BasicSelect
            label={"Local de Secagem"}
            name={"id_location"}
            values={locations}
            control={control}
            error={errors.id_location as FieldError}
          />
        </Grid>
        
            <Grid item xs={12} sm={12}>
              <BasicTextField
                label={"Massa Úmida Total"}
                name={"cropFullWetMass"}
                control={control}
                error={errors.cropFullWetMass as FieldError}
              />
            </Grid>

            <Grid item xs={12} sm={12}>
              <BasicTextField
                label={"Massa Úmida Debulhada"}
                name={"cropFlowerWetMass"}
                control={control}
                error={errors.cropFlowerWetMass as FieldError}
              />
            </Grid>

            <Grid item xs={12} sm={12}>
              <BasicTextField
                label={"Massa Descartada"}
                name={"cropWetTrimMass"}
                control={control}
                error={errors.cropWetTrimMass as FieldError}
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
        <CardContent
          
          >
           {idPlants?.length} planta(s) a ser(em) colhida
         </CardContent>
      </Box>
    </Container>
  );
}
