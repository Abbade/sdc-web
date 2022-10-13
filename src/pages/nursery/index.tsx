import { Typography } from "@mui/material";
import { useRouter } from "next/router";
import { useContext, useState, useEffect } from "react";
import { Can } from "../../components/Can";
import LoteTable from "../../components/TableModels/LoteTable";
import TrashedLoteTable from "../../components/TableModels/TrashedLoteTable";
import { AuthContext } from "../../contexts/AuthContext";
import { LoteInterface } from "../../interfaces/LoteInterface";
import { api } from "../../services/apiClient";
import { withSSRAuth } from "../../utils/withSSRAuth";

export default function LoteDashboard() {
  const { user, signOut, isAuthenticated } = useContext(AuthContext)

  const routing = useRouter()



  useEffect(() => {
    api.get('/me')
      .then(response => console.log(response))
  }, [])

  return (
    <>
    <Typography component="h1" variant="h4" sx={{pt: 1, pb: 1}}>
      Buscar no berçário
    </Typography>


      <LoteTable></LoteTable>
      <Can permissions={['lote.list']}>
        <div>Métricas</div>
      </Can>
    </>
  )
}

export const getServerSideProps = withSSRAuth(async (ctx) => {

  return {
    props: {}
  }
})

