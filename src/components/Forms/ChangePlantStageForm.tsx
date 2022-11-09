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




type ChangePlantStageFormData = {
  plants: number[];
  id_faseCultivo: number;
  obs: string;
}

const createObjFormSchema = yup.object().shape({
  // id_lote: yup.number().required("Genética é obrigatório"),

  actionDate: yup.date().required("Data obrigatória"),
  obs: yup.string().required("Observação obrigatória"),
  id_faseCultivo: yup.number().required("Genética é obrigatório"),
});
const theme = createTheme();


export default function ChangePlantStageForm(plants) {

  const {
    register,
    handleSubmit,
    control,
    formState: { errors, isSubmitting },
  } = useForm({ resolver: yupResolver(createObjFormSchema) });

  

  const [idPlants, setIdPlants] = useState([] as number[])

 

  const [faseCultivo, setFaseCultivo] = useState(
    [] as FaseCultivo[]
  );

  useEffect(() => {
    const getFasesCultivo = async () => {
      var response = await api.get("/fase-cultivo");
      setFaseCultivo(response.data.itens);
    };
    getFasesCultivo();
    console.log(faseCultivo)
  }, []);



  useEffect(() => {
    console.log(plants.plants)
    if(plants.plants.length > 0) {
      setIdPlants(plants.plants.map((plant) => {
        return plant.id
      }))
  
    }
    

  }, [plants])



  const handleLoteSubmit: SubmitHandler<ChangePlantStageFormData> = async (
    formData
  ) => {
    try {
      formData.plants = idPlants


      const lote = await api.post("plant-stage", formData);
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
                label={"Data da Ação"}
                name={"actionDate"}
                control={control}
                error={errors.actionDate as FieldError}
              />
            </Grid>

           

            <Grid item xs={12} sm={12}>
              <BasicSelect
                label={"Fase De Cultivo"}
                name={"id_faseCultivo"}
                values={faseCultivo}
                control={control}
                error={errors.faseCultivo as FieldError}
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
            Alterar Fase de Cultivo de Planta(s)
          </Button>
        </Box>
      </Box>
    </Container>
  );
}
