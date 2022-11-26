import { useRouter } from "next/router";
import { useContext, useEffect, useMemo, useState } from "react";
import { api } from "../../../services/apiClient";
import { withSSRAuth } from "../../../utils/withSSRAuth";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import { Can } from "../../../components/Can";
import PlantsTable from "../../../components/TableModels/PlantsTable";
import TrashedLoteTable from "../../../components/TableModels/TrashedLoteTable";
import { LoteInterface } from "../../../interfaces/LoteInterface";
import { AlertContext } from "../../../contexts/AlertContext";
import Paper from "@mui/material/Paper";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import { Box, Table, useTheme } from "@mui/material";
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { PlantProvider } from "../../../contexts/PlantsContext";
import { PlantaInterface } from "../../../interfaces/PlantaInterface";
import { GridColumns } from "@mui/x-data-grid";
import ActionPlantsTable from "../../../components/TableModels/ActionPlantsTable";

export default function LoteDetail() {
  const { setOpenLoading } = useContext(AlertContext);

  const routing = useRouter();
  const { id } = routing.query;
  const theme = useTheme();
  const [selectedLote, setSelectedLote] = useState({} as any);

  useEffect(() => {
    const getLote = async () => {
      setOpenLoading(true);
      var response = await api.get("/plant", id ? { params: { id: id } } : {});
      setOpenLoading(false);
      console.log(response.data);
      setSelectedLote(response.data.itens[0]);
    };
    if (id?.length > 0) {
      getLote();
    }
  }, [id, setOpenLoading]);

  const columns = useMemo<GridColumns<any>>(
    () => [
      { field: "id", headerName: "ID", width: 70 },
      {
        field: "genetic.name",
        headerName: "Genética",
        width: 130,
        renderCell: (params) => {
          // console.log(params.row.genetic.name)
          return (
            <div className="MuiDataGrid-cellContent">
              {params.row.genetic.name}
            </div>
          );
        },
      },

      { field: "name", headerName: "Código", width: 130 },
      { field: "qtProp", headerName: "Em Propagação", width: 130 },
      { field: "qtPlant", headerName: "Transplantes", width: 130 },
      { field: "qtPropTrashed", headerName: "Descartes", width: 130 },

    ],
    []
  );

  return (
    <>
      <Typography mb={2} component="h1" variant="h4">
        Planta: {selectedLote?.name}
      </Typography>

      <Grid mb={2} container direction="row" justifyContent="center" spacing={2}>
        <Grid item xs={12} sm={12} md={3}>
          <Card>
            <CardContent sx={{ alignItems: "center", textAlign: 'center'}}>
              <Typography variant="h5" color={"primary.main"} component="div">
                Fase:
              </Typography>
              <Typography variant="h5" color={"primary.main"} component="div">
                {selectedLote.faseCultivo?.name}
              </Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} sm={12} md={3}>
          <Card>
            <CardContent sx={{ alignItems: "center", textAlign: 'center'}}>
              <Typography variant="h5" color={"success.main"} component="div">
                Recipiente:
              </Typography>
              <Typography variant="h5" color={"success.main"} component="div">
                {selectedLote.recipiente?.name}
              </Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} sm={12} md={3}>
          <Card>
            <CardContent sx={{ alignItems: "center", textAlign: 'center'}}>
              <Typography variant="h5" color={"error.light"} component="div">
                Local:
              </Typography>
              <Typography variant="h5" color={"error.light"} component="div">
                {selectedLote.location?.name}
              </Typography>
            </CardContent>
          </Card>
        </Grid>
   
      </Grid>

      <Accordion>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel1a-content"
          id="panel1a-header"
        >
          <Typography>Histórico de Atividades</Typography>
        </AccordionSummary>
        <AccordionDetails>
<ActionPlantsTable id={id}></ActionPlantsTable>
          {/* <PlantProvider>
            <PlantsTable id={id}></PlantsTable>
          </PlantProvider> */}
        </AccordionDetails>
      </Accordion>

   


      {/* <Can permissions={["lote.list"]}>
        <div>Métricas</div>
      </Can> */}
    </>
  );
}

export const getServerSideProps = withSSRAuth(async (ctx) => {
  return {
    props: {},
  };
});
