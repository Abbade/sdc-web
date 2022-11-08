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
  Location, Recipiente, TrashReason
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
  id_trashReason: number;
  obs: string;
}

const createObjFormSchema = yup.object().shape({
  // id_lote: yup.number().required("Genética é obrigatório"),

  trashDate: yup.date().required("Data obrigatória"),
  obs: yup.string().required("Observação obrigatória"),
  id_trashReason: yup.number().required("Genética é obrigatório"),
});
const theme = createTheme();


export default function TrashPlantForm(plants) {

  const {
    register,
    handleSubmit,
    control,
    formState: { errors, isSubmitting },
  } = useForm({ resolver: yupResolver(createObjFormSchema) });

  

  const [idPlants, setIdPlants] = useState([] as number[])

  const [trashReasons, setTrashReasons] = useState(
    [] as TrashReason[]
  );

  useEffect(() => {
    const getTrashReasons = async () => {
      var response = await api.get("/trash-reason");
      setTrashReasons(response.data);
    };
    getTrashReasons();
  }, []);

  // const [location, setLocation] = useState(
  //   [] as Location[]
  // );

  // useEffect(() => {
  //   const getLocations = async () => {
  //     var response = await api.get("/location");
  //     setLocation(response.data);
  //   };
  //   getLocations();
  // }, []);


 

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


      const lote = await api.post("trash-plant", formData);
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
                label={"Data de Descarte"}
                name={"trashDate"}
                control={control}
                error={errors.trashDate as FieldError}
              />
            </Grid>

            <Grid item xs={12} sm={12}>
              <BasicSelect
                label={"Trash Reason"}
                name={"id_trashReason"}
                values={trashReasons}
                control={control}
                error={errors.id_trashReason as FieldError}
              />
            </Grid>
{/* 
            <Grid item xs={12} sm={12}>
              <BasicSelect
                label={"Location"}
                name={"id_location"}
                values={location}
                control={control}
                error={errors.id_location as FieldError}
              />
            </Grid> */}
        
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
