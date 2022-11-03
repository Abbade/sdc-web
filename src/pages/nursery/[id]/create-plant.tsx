import {
  Box, Container, createTheme, Typography
} from "@mui/material";
import { useRouter } from 'next/router';
import * as yup from "yup";

import { useEffect, useState } from "react";
import { api } from "../../../services/apiClient";

import { yupResolver } from "@hookform/resolvers/yup";
import {
  useForm
} from "react-hook-form";
import CreatePlantForm from "../../../components/Forms/CreatePlantForm";
import {
  LoteInterface, TrashReason
} from "../../../interfaces/LoteInterface";
import { withSSRAuth } from "../../../utils/withSSRAuth";

type TrashLoteFormData = {
  idLote: number;
  id_trashReason: number;
  qtTrash: number;
  obs: string;
  trashDate: Date;
};

const createObjFormSchema = yup.object().shape({
  trashDate: yup.date().required("Data obrigatória"),
  obs: yup.string().required("Observação obrigatória"),
  id_trashReason: yup.number().required("Genética é obrigatório"),
  qtTrash: yup.number().required("Quantidade total é obrigatória"),
});
const theme = createTheme();


export default function CreatePlant() {

  const {
    register,
    handleSubmit,
    control,
    formState: { errors, isSubmitting },
  } = useForm({ resolver: yupResolver(createObjFormSchema) });


  const [trashReason, setTrashReason] = useState(
    [] as TrashReason[]
  );

  const routing = useRouter()
  const [idLote, setIdLote] = useState(Number.parseInt(routing.asPath.split("/")[2]))

  const [selectedLote, setSelectedLote] = useState({} as LoteInterface)







  useEffect(() => {
    console.log(idLote)

    const getLotes = async () => {
      var response = await api.get("/lote", idLote ? { params: { id: idLote } } : {});
      console.log(response.data)
      console.log(response.data.itens[0])
      setSelectedLote(response.data.itens[0]);
      setIdLote(Number.parseInt(routing.asPath.split("/")[2]))
    };
    
    getLotes()

  }, [routing.asPath, routing.isReady]);



  return (
    <Container component="main" maxWidth="md">

      <Box
        sx={{
          marginTop: 1,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
              <Typography component="h1" variant="h5">
          Transplantar Estacas: {selectedLote.name}
        </Typography>
        <CreatePlantForm selectedLote={selectedLote}></CreatePlantForm>
      </Box>
    </Container>
  );
}

export const getServerSideProps = withSSRAuth(async (ctx) => {

  return {
    props: {

    }
  }
})