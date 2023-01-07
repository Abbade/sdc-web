import { Typography } from "@mui/material";
import { useRouter } from "next/router";
import { useContext, useEffect } from "react";
import { Can } from "../../components/Can";
import FinishCropForm from "../../components/Forms/FinishCropForm";
import CropsTable from "../../components/TableModels/CropsTable";
import { AuthContext } from "../../contexts/AuthContext";
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
      <Typography component="h1" variant="h4" sx={{ pt: 1, pb: 1 }}>
        Buscar no berçário
      </Typography>

      <CropsTable></CropsTable>
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

