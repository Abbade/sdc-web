import {
  Box, Button, Checkbox, Container, createTheme, FormControlLabel, Grid
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
  Location, Recipiente
} from "../../interfaces/LoteInterface";
import BasicDatePicker from "../Inputs/BasicDatePicker";
import BasicSelect from "../Inputs/BasicSelect";
import BasicTextField from "../Inputs/BasicTextField";
import { PlantaInterface } from "../../interfaces/PlantaInterface";
import { AlertContext } from "../../contexts/AlertContext";




type MovePlantFormData = {
  plants: number[];
  id_location: number;
  obs: string;
  scheduled: boolean;
  id_user_atribution: number;
  moveDate: Date;
}

const createObjFormSchema = yup.object().shape({
  // id_lote: yup.number().required("Genética é obrigatório"),

  moveDate: yup.date().required("Data obrigatória"),
  obs: yup.string().required("Observação obrigatória"),
  id_location: yup.number().required("Genética é obrigatório"),
  scheduled: yup.boolean(),
  id_user_atribution: yup.number().required("Responsável obrigatório"),
});
const theme = createTheme();


export default function MovePlantForm(plants) {

  const {
    register,
    handleSubmit,
    control,
    formState: { errors, isSubmitting },
  } = useForm({ resolver: yupResolver(createObjFormSchema) });

  
  const [scheduled, setScheduled] = useState(false);

  const [idPlants, setIdPlants] = useState([] as number[])

 

  const [location, setLocation] = useState(
    [] as Location[]
  );



  useEffect(() => {
    const getLocations = async () => {
      var response = await api.get("/location");
      setLocation(response.data.itens);
    };
    getLocations();
  }, []);
  const [user, setUser] = useState(
    [] as Location[]
  );
  useEffect(() => {
    const getUsers = async () => {
      var response = await api.get("/user");
      console.log(response.data.itens)
      setUser(response.data.itens);
    };
    getUsers();
  }, []);



  useEffect(() => {
    console.log(plants.plants)
    if(plants.plants.length > 0) {
      setIdPlants(plants.plants.map((plant) => {
        return plant.id
      }))
  
    }
    

  }, [plants])


  const { showAlert, setOpenLoading } = useContext(AlertContext);


  const handleLoteSubmit: SubmitHandler<MovePlantFormData> = async (
    formData
  ) => {
  setOpenLoading(true);

    try {

      formData.plants = idPlants
      formData.scheduled = scheduled


      const lote = await api.post("move-plant", formData);
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
                label={"Data de Movimentação"}
                name={"moveDate"}
                control={control}
                error={errors.moveDate as FieldError}
              />
            </Grid>

            <Grid item xs={12} sm={12}>

<FormControlLabel label="Agendar" control={

<Checkbox
              name="scheduled"
              onChange={
              (event, checked) => {
                console.log(checked)
                setScheduled(checked)
              }
              }
              ></Checkbox>
}              ></FormControlLabel>
              
            </Grid>

            <Grid item xs={12} sm={12}>
              <BasicSelect
                label={"Responsável"}
                name={"id_user_atribution"}
                values={user}
                control={control}
                error={errors.id_user_atribution as FieldError}
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
            Mover Plantas
          </Button>
        </Box>
      </Box>
    </Container>
  );
}
