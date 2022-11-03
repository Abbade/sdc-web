import {
  Box, Container, Typography
} from "@mui/material";
import { useRouter } from 'next/router';
import { useEffect, useState } from "react";
import TrashLoteForm from "../../../components/Forms/TrashLoteForm";
import {
  LoteInterface
} from "../../../interfaces/LoteInterface";
import { api } from "../../../services/apiClient";
import { withSSRAuth } from "../../../utils/withSSRAuth";

export default function TrashLote() {

  const routing = useRouter()
  const [idLote, setIdLote] = useState(Number.parseInt(routing.asPath.split("/")[2]))

  const [selectedLote, setSelectedLote] = useState({} as LoteInterface)

  useEffect(() => {

    const getLotes = async () => {
      var response = await api.get("/lote", idLote ? { params: { id: idLote } } : {});
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
          Descartar Estacas: {selectedLote.name}
        </Typography>
        <TrashLoteForm selectedLote={selectedLote}></TrashLoteForm>
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