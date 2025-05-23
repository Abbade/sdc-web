import Typography from "@mui/material/Typography";
import { useRouter } from "next/router";
import { useContext, useEffect } from "react";
import { Can } from "../../components/Can";
import PlantsTable from "../../components/TableModels/PlantsTable";
import { AuthContext } from "../../contexts/AuthContext";
import { PlantProvider } from "../../contexts/PlantsContext";
import { withSSRAuth } from "../../utils/withSSRAuth";

export default function Plants() {

  useEffect(() => {

  }, [])

  return (
    <PlantProvider>
    <Typography component="h1" variant="h4" sx={{pt: 1, pb: 1}}>
      Buscar Plantas
    </Typography>


      <PlantsTable id={undefined}></PlantsTable>
      <Can permissions={['lote.list']}>
        <div>Métricas</div>
      </Can>
    </PlantProvider>
  )
}

export const getServerSideProps = withSSRAuth(async (ctx) => {

  return {
    props: {}
  }
},
{
  permissions: ["plant.list"],
})

