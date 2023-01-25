import { yupResolver } from "@hookform/resolvers/yup";
import { Box, Button, Checkbox, FormControlLabel, Grid } from "@mui/material";
import { useContext, useEffect, useState } from "react";
import { FieldError, SubmitHandler, useForm } from "react-hook-form";
import * as yup from "yup";
import { AlertContext } from "../../contexts/AlertContext";
import { EditInterface } from "../../interfaces/EditInterface";
import { Genetic, PropagationType, Recipiente } from "../../interfaces/LoteInterface";
import { api } from "../../services/apiClient";
import BasicDatePicker from "../Inputs/BasicDatePicker";
import BasicSelect from "../Inputs/BasicSelect";
import BasicTextField from "../Inputs/BasicTextField";

type CreateLoteFormData = {
  id_propagationType: number;
  id_genetic: number;
  id_location_init: number;
  qtTotal: number;
  obs: string;
  propDate: Date;
  scheduled: boolean
};

const createObjFormSchema = yup.object().shape({
  propDate: yup.date().required("Data obrigatória"),
  obs: yup.string().required("Observação obrigatória"),
  id_propagationType: yup.number().required("Tipo de propagação é obrigatório"),
  id_genetic: yup.number().required("Genética é obrigatório"),
  id_location_init: yup.number().required("Localização é obrigatória"),
  qtTotal: yup.number().required("Quantidade total é obrigatória"),
  scheduled: yup.boolean(),
  id_user_atribution: yup.number().required("Responsável é obrigatório")
});

export default function CreateLoteForm({ onClose }: EditInterface) {
  const {
    register,
    handleSubmit,
    control,
    formState: { errors, isSubmitting },
  } = useForm({ resolver: yupResolver(createObjFormSchema) });

  const [propagationType, setPropagationType] = useState(
    [] as PropagationType[]
  );
  const [location, setLocation] = useState([] as Location[]);
  const [scheduled, setScheduled] = useState(false);

  useEffect(() => {
    const getPropagationTypes = async () => {
      var response = await api.get("/propagation-type");
      setPropagationType(response.data.itens);
    };

    getPropagationTypes();
  }, []);

  const [genetic, setGenetics] = useState([] as Genetic[]);
  const [recipiente, setRecipiente] = useState([] as Recipiente[]);

  useEffect(() => {
    const getGenetics = async () => {
      var response = await api.get("/genetic");
      setGenetics(response.data.itens);
    };

    getGenetics();
  }, []);
  useEffect(() => {
    const getRecipientes = async () => {
      var response = await api.get("/recipiente");
      setRecipiente(response.data.itens);
    };

    getRecipientes();
  }, []);
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
  const { showAlert, setOpenLoading } = useContext(AlertContext);

  const handleLoteSubmit: SubmitHandler<CreateLoteFormData> = async (
    formData
  ) => {
    setOpenLoading(true);
    try {
      const user = await api.post("lote", formData);

      showAlert("Lote cadastrado com sucesso.", "success");
      setOpenLoading(false);
      onClose(true);
      // Router.back();
    } catch (error) {
      const errorOficial = error as Error;
      setOpenLoading(false);
      showAlert(errorOficial.message, "error");
    }
  };

  return (
    <Box
      component="form"
      noValidate
      onSubmit={handleSubmit(handleLoteSubmit)}
      sx={{ mt: 3 }}
    >
      <Grid container spacing={2}>
        <Grid item xs={12} sm={12}>
          <BasicSelect
            label={"Genética"}
            name={"id_genetic"}
            values={genetic}
            control={control}
            error={errors.id_genetic as FieldError}
          />
        </Grid>
        <Grid item xs={12} sm={12}>
          <BasicDatePicker
            label={"Data de Propagação"}
            name={"propDate"}
            control={control}
            error={errors.propDate as FieldError}
          />
        </Grid>
        {/* <Grid item xs={12} sm={12}>

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
              
            </Grid> */}
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
            label={"Recipiente"}
            name={"id_recipiente"}
            values={recipiente}
            control={control}
            error={errors.id_recipiente as FieldError}
          />
        </Grid>
        <Grid item xs={12} sm={12}>
          <BasicSelect
            label={"Tipo de Propagação"}
            name={"id_propagationType"}
            values={propagationType}
            control={control}
            error={errors.id_propagationType as FieldError}
          />
        </Grid>

        <Grid item xs={12} sm={12}>
          <BasicSelect
            label={"Origem"}
            control={control}
            name={"id_origem"}
            error={errors.id_origem as FieldError}
          />
        </Grid>

        <Grid item xs={12} sm={12}>
          <BasicSelect
            label={"Local"}
            name={"id_location_init"}
            values={location}
            control={control}
            error={errors.id_location_init as FieldError}
          />
        </Grid>
        <Grid item xs={12} sm={12}>
          <BasicTextField
            label={"Quantidade"}
            name={"qtTotal"}
            control={control}
            error={errors.qtTotal as FieldError}
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
      <Button type="submit" fullWidth variant="contained" sx={{ mt: 3, mb: 2 }}>
        Cadastrar Lote
      </Button>
    </Box>
  );
}
