import { yupResolver } from "@hookform/resolvers/yup";
import { Button } from "@mui/material";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";
import { useRouter } from "next/router";
import { useContext, useEffect, useState } from "react";
import { FieldError, SubmitHandler, useForm } from "react-hook-form";
import * as yup from "yup";
import { AlertContext } from "../../../contexts/AlertContext";
import { EditInterface } from "../../../interfaces/EditInterface";
import { api } from "../../../services/apiClient";
import { withSSRAuth } from "../../../utils/withSSRAuth";
import BasicSelect from "../../Inputs/BasicSelect";
import BasicTextField from "../../Inputs/BasicTextField";

type CreateFormData = {
  id: number;
  name: string;
};


const createObjFormSchema = yup.object().shape({
  id: yup.number(),
  name: yup.string().required("Nome é obrigatório"),
});


export default function VariationTypeForm({ id, onClose }: EditInterface) {
  const router = useRouter();

  const {
    register,
    handleSubmit,
    control,
    setValue,
    formState: { errors, isSubmitting },
  } = useForm({ resolver: yupResolver(createObjFormSchema) });

  const { setAlert, setOpenLoading, showAlert } = useContext(AlertContext);

  useEffect(() => {
    console.log("render edit " + id);
    const get = async (id) => {
      setOpenLoading(true);
      try {
 

        if (id > 0) {
          // TODO MUDAR DPS TO DO     const item = await api.get(`user/${id}`);
          const item = await api.get(`variableTypes/${id}`);
          setValue("name", item.data.name);
          setValue("id", item.data.id);
        }
        setOpenLoading(false);
      } catch (error) {
        setAlert({
          message: error.response.data.message,
          alertType: 'error',
          openAlert: true,
        });
        setOpenLoading(false);
      }
    };

    get(id);
  }, [id, setValue, setOpenLoading, setAlert]);

  const handleLoteSubmit: SubmitHandler<CreateFormData> = async (formData) => {
    try {
      setOpenLoading(true);
      console.log(formData)
      if (formData.id > 0) {
        const item = await api.put("variableTypes", formData);
        setOpenLoading(false);
        showAlert("Variação editada com sucesso.", "success");
      } else {
        const item = await api.post("variableTypes", formData);
        setOpenLoading(false);
        showAlert("Variação cadastrada com sucesso.", "success");
      }
      onClose(true);
    } catch (error) {
      setOpenLoading(false);
      showAlert(error.response.data.message, "error");
    }
  };

  return (
    <Container component="main" maxWidth="xs">
      <Box
        component="div"
        sx={{ mt: 1 }}
      >
        <Grid container spacing={2}>
          <Grid item xs={12} sm={12}>
            <BasicTextField
              label={"Nome"}
              name={"name"}
              control={control}
              error={errors.name as FieldError}
            />
          </Grid>
        </Grid>

        <Button
          type="button"
          fullWidth
          onClick={handleSubmit(handleLoteSubmit)}
          variant="contained"
          sx={{ mt: 3, mb: 2 }}
        >
          {id != undefined ? "Editar" : "Cadastrar"} Tipo Variação
        </Button>
      </Box>
    </Container>
  );
}
export const getServerSideProps = withSSRAuth(
  async (ctx) => {
    return {
      props: {},
    };
  },
  {
    permissions: ["product.create"],
  }
);
