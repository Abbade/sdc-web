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
      <h1>Buscar no berçário</h1>

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

