import { useContext, useEffect, useState } from "react";
import Router, { useRouter } from "next/router";
import Box from "@mui/material/Box";
import { AuthContext } from "../../../contexts/AuthContext";
import { setupAPIClient } from "../../../services/api";
import { api } from "../../../services/apiClient";
import { withSSRAuth } from "../../../utils/withSSRAuth";

import { Can } from "../../../components/Can";
import Table from "../../../components/Table";
import { Button, Typography } from "@mui/material";
import { GridColDef, GridValueGetterParams } from "@mui/x-data-grid";
import { LoteInterface } from "../../../interfaces/LoteInterface";
import TrashedLoteTable from "../../../components/TableModels/TrashedLoteTable";
export default function LoteDetailDashboard() {
  const { user, signOut, isAuthenticated } = useContext(AuthContext)

  const routing = useRouter()
  const idLote = Number.parseInt(routing.asPath.split("/")[2])

  const [selectedLote, setSelectedLote] = useState(
    {id: 0} as LoteInterface
  );

  useEffect(() => {

    const getLote = async () => {

      var response = await api.get("/lote",{params: 
        idLote ? {id: idLote} : { }
      });
      console.log(response.data)
      setSelectedLote(response.data?.itens[0]);
    };

    getLote();

  }, []);

  useEffect(() => {
    api.get('/me')
      .then(response => console.log(response))
  }, [])

  return (
    <>
      <h1>Lote: {selectedLote?.name}</h1>


      <h3>Descartes de Lote:</h3>
      
      <TrashedLoteTable id={selectedLote?.id}></TrashedLoteTable>
      <Can permissions={['lote.list']}>
        <div>Métricas</div>
      </Can>
    </>
  )
}



export const getServerSideProps = withSSRAuth(async (ctx) => {

  return {
    props: {

    }
  }
})

