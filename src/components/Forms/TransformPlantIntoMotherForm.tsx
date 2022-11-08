import {
  Box, Button, Container, createTheme, Grid
} from "@mui/material";
import * as yup from "yup";

import { useEffect, useState } from "react";
import { api } from "../../services/apiClient";

import { yupResolver } from "@hookform/resolvers/yup";
import {
  FieldError,
  SubmitHandler,
  useForm
} from "react-hook-form";
import {
  FaseCultivo,
  Location, Recipiente
} from "../../interfaces/LoteInterface";
import BasicDatePicker from "../Inputs/BasicDatePicker";
import BasicSelect from "../Inputs/BasicSelect";
import BasicTextField from "../Inputs/BasicTextField";
import { PlantaInterface } from "../../interfaces/PlantaInterface";




type TransformPlantIntoMotherFormData = {
  actionDate: Date;
  plants: number[];
  obs: string;
}

const createObjFormSchema = yup.object().shape({
  // id_lote: yup.number().required("Genética é obrigatório"),

  actionDate: yup.date().required("Data obrigatória"),
  obs: yup.string().required("Observação obrigatória"),
});
const theme = createTheme();


export default function TransformPlantIntoMotherForm(plants) {

  const {
    register,
    handleSubmit,
    control,
    formState: { errors, isSubmitting },
  } = useForm({ resolver: yupResolver(createObjFormSchema) });

  

  const [idPlants, setIdPlants] = useState([] as number[])

 

 

  useEffect(() => {
    console.log(plants.plants)
    if(plants.plants.length > 0) {
      setIdPlants(plants.plants.map((plant) => {
        return plant.id
      }))
  
    }
    

  }, [plants])



  const handleLoteSubmit: SubmitHandler<TransformPlantIntoMotherFormData> = async (
    formData
  ) => {
    try {
      formData.plants = idPlants


      const lote = await api.post("plant-mother", formData);
      // Router.push('/nursery/'+selectedLote.id)


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
              <BasicDatePicker
                label={"Data de Transformação"}
                name={"actionDate"}
                control={control}
                error={errors.actionDate as FieldError}
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
            Transformar Planta(s) em Matrize(s)
          </Button>
        </Box>
      </Box>
    </Container>
  );
}
