import { useRouter } from "next/router";
import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../../contexts/AuthContext";
import { api } from "../../../services/apiClient";
import { withSSRAuth } from "../../../utils/withSSRAuth";

import { Grid } from "@mui/material";
import { Can } from "../../../components/Can";
import PlantsTable from "../../../components/TableModels/PlantsTable";
import TrashedLoteTable from "../../../components/TableModels/TrashedLoteTable";
import { LoteInterface } from "../../../interfaces/LoteInterface";
export default function LoteDetail() {
  const { user, signOut, isAuthenticated } = useContext(AuthContext);

  const routing = useRouter();
  const [idLote, setIdLote] = useState(
    Number.parseInt(routing.asPath.split("/")[2])
  );

  const [selectedLote, setSelectedLote] = useState({} as LoteInterface);

  useEffect(() => {
    console.log(idLote);

    const getLotes = async () => {
      var response = await api.get(
        "/lote",
        idLote ? { params: { id: idLote } } : {}
      );
      console.log(response.data);
      console.log(response.data.itens[0]);
      setSelectedLote(response.data.itens[0]);
      setIdLote(Number.parseInt(routing.asPath.split("/")[2]));
    };

    getLotes();
  }, [routing.asPath, routing.isReady]);

  useEffect(() => {
    api.get("/me").then((response) => console.log(response));
  }, []);

  return (
    <>
      <h1>Lote: {selectedLote?.name}</h1>

      <Grid container spacing={2}>
        <Grid item xs={12} sm={12} md={3}>
          Em Propagação: {selectedLote.qtProp}
        </Grid>
        <Grid item xs={12} sm={12} md={3}>
          Descartados: {selectedLote.qtPropTrashed}
        </Grid>
        <Grid item xs={12} sm={12} md={3}>
          Transplantados: {selectedLote.qtPlant}
        </Grid>
      </Grid>

      <h3>Plantas Transplantadas</h3>
      <PlantsTable id={idLote}></PlantsTable>
      <h3>Descartes</h3>
      <TrashedLoteTable id={idLote}></TrashedLoteTable>
      <Can permissions={["lote.list"]}>
        <div>Métricas</div>
      </Can>
    </>
  );
}

export const getServerSideProps = withSSRAuth(async (ctx) => {
  return {
    props: {},
  };
});
