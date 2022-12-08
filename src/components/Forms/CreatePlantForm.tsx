import { Box, Button, Container, createTheme, Grid } from "@mui/material";
import * as yup from "yup";
import { useContext, useEffect, useState } from "react";
import { api } from "../../services/apiClient";
import { yupResolver } from "@hookform/resolvers/yup";
import { FieldError, SubmitHandler, useForm } from "react-hook-form";
import { Location, LoteInterface, Recipiente } from "../../interfaces/LoteInterface";
import BasicDatePicker from "../Inputs/BasicDatePicker";
import BasicSelect from "../Inputs/BasicSelect";
import BasicTextField from "../Inputs/BasicTextField";
import { AlertContext } from "../../contexts/AlertContext";

type CreatePlantFormData = {
  id_lote: number;
  aclimatationDate: Date;
  qtPlant: number;
  id_location: number;
  id_recipiente: number;
  obs: string;
};

const createObjFormSchema = yup.object().shape({
  // id_lote: yup.number().required("Genética é obrigatório"),

  aclimatationDate: yup.date().required("Data obrigatória"),
  obs: yup.string().required("Observação obrigatória"),
  id_location: yup.number().required("Genética é obrigatório"),
  id_recipiente: yup.number().required("Genética é obrigatório"),
  qtPlant: yup.number().required("Quantidade total é obrigatória"),
});
const theme = createTheme();

type CreatePlantFormType = {
  selectedLote : LoteInterface;
  onClose?: (refresh? : boolean) => void;
}

export default function CreatePlantForm({selectedLote, onClose} : CreatePlantFormType) {
  const {
    handleSubmit,
    control,
    formState: { errors, isSubmitting },
  } = useForm({ resolver: yupResolver(createObjFormSchema) });

  const [idLote, setIdLote] = useState(0);

  const [recipiente, setRecipiente] = useState([] as Recipiente[]);

  useEffect(() => {
    const getRecipientes = async () => {
      var response = await api.get("/recipiente");
      console.log(response.data.itens)
      setRecipiente(response.data.itens);
    };
    getRecipientes();
  }, []);

  const [location, setLocation] = useState([] as Location[]);

  useEffect(() => {
    const getLocations = async () => {
      var response = await api.get("/location");
      console.log(response.data.itens)

      setLocation(response.data.itens);
    };
    getLocations();
  }, []);

  useEffect(() => {
    setIdLote(selectedLote.id);
  }, [selectedLote]);


  const { showAlert, setOpenLoading } = useContext(AlertContext);

  const handleLoteSubmit: SubmitHandler<CreatePlantFormData> = async (
    formData
  ) => {
    setOpenLoading(true);

    try {
      formData.id_lote = idLote;

      const lote = await api.post("plant", formData);
      showAlert(formData.qtPlant + " plantas do lote " + selectedLote.name + " cadastradas com sucesso.", "success");
      setOpenLoading(false);
      onClose();
      // Router.push('/nursery/'+selectedLote.id)
    } catch (error) {
      const errorOficial = error as Error;
      setOpenLoading(false);
      showAlert(errorOficial.message, "error");

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
                name={"aclimatationDate"}
                control={control}
                error={errors.aclimatationDate as FieldError}
              />
            </Grid>

            <Grid item xs={12} sm={12}>
              <BasicTextField
                label={
                  "Quantidade  (" +
                  selectedLote.qtProp +
                  " Disponíveis)"
                }
                name={"qtPlant"}
                control={control}
                error={errors.qtPlant as FieldError}
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
            Cadastrar Planta
          </Button>
        </Box>
      </Box>
    </Container>
  );
}
