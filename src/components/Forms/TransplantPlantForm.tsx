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

const postmanJson = {
  "transplantDate": "2012-04-30T18:25:43.511Z",
  "plants": [1, 2, 3, 4],
  "id_recipiente": 1,
  "id_location": 1,
  "id_faseCultivo": 2,


  "obs": "Ae"
  }


type TransplantPlantFormData = {
  plants: number[];
  id_lote: number;
  id_location: number;
  id_recipiente: number;
  id_faseCultivo: number;
  obs: string;
}

const createObjFormSchema = yup.object().shape({
  // id_lote: yup.number().required("Genética é obrigatório"),

  transplantDate: yup.date().required("Data obrigatória"),
  obs: yup.string().required("Observação obrigatória"),
  id_location: yup.number().required("Genética é obrigatório"),
  id_recipiente: yup.number().required("Genética é obrigatório"),
  id_faseCultivo: yup.number().required("Genética é obrigatório"),
});
const theme = createTheme();


export default function TransplantPlantForm(plants) {

  const {
    register,
    handleSubmit,
    control,
    formState: { errors, isSubmitting },
  } = useForm({ resolver: yupResolver(createObjFormSchema) });

  

  const [idPlants, setIdPlants] = useState([] as number[])

  const [recipiente, setRecipiente] = useState(
    [] as Recipiente[]
  );

  useEffect(() => {
    const getRecipientes = async () => {
      var response = await api.get("/recipiente");
      setRecipiente(response.data);
    };
    getRecipientes();
  }, []);

  const [location, setLocation] = useState(
    [] as Location[]
  );

  useEffect(() => {
    const getLocations = async () => {
      var response = await api.get("/location");
      setLocation(response.data);
    };
    getLocations();
  }, []);


  const [faseCultivo, setFaseCultivo] = useState(
    [] as FaseCultivo[]
  );

  useEffect(() => {
    const getFasesCultivo = async () => {
      var response = await api.get("/fase-cultivo");
      setFaseCultivo(response.data.itens);
    };
    getFasesCultivo();
  }, []);


  useEffect(() => {
    console.log(plants.plants)
    if(plants.plants.length > 0) {
      setIdPlants(plants.plants.map((plant) => {
        return plant.id
      }))
  
    }
    

  }, [plants])



  const handleLoteSubmit: SubmitHandler<TransplantPlantFormData> = async (
    formData
  ) => {
    try {
      formData.plants = idPlants


      const lote = await api.post("transplant-plant", formData);
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
                label={"Data de Transplante"}
                name={"transplantDate"}
                control={control}
                error={errors.transplantDate as FieldError}
              />
            </Grid>

           

            <Grid item xs={12} sm={12}>
              <BasicSelect
                label={"Location"}
                name={"id_location"}
                values={location}
                control={control}
                error={errors.id_location as FieldError}
              />
            </Grid>
            <Grid item xs={12} sm={12}>
              <BasicSelect
                label={"Recipiente"}
                name={"id_recipiente"}
                values={recipiente}
                control={control}
                error={errors.id_recipiente as FieldError}
              />
            </Grid>
            <Grid item xs={12} sm={12}>
              <BasicSelect
                label={"Fase Cultivo"}
                name={"id_faseCultivo"}
                values={faseCultivo}
                control={control}
                error={errors.id_faseCultivo as FieldError}
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
