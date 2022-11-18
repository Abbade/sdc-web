import { useRouter } from "next/router";
import { useContext, useEffect, useState } from "react";
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
import { useTheme } from "@mui/material";
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

export default function LoteDetail() {
  const { setOpenLoading } = useContext(AlertContext);

  const routing = useRouter();
  const { id } = routing.query;
  const theme = useTheme();
  const [selectedLote, setSelectedLote] = useState({} as LoteInterface);

  useEffect(() => {
    const getLote = async () => {
      setOpenLoading(true);
      var response = await api.get("/lote", id ? { params: { id: id } } : {});
      setOpenLoading(false);
      console.log(response.data);
      setSelectedLote(response.data.itens[0]);
    };
    if (id?.length > 0) {
      getLote();
    }
  }, [id, setOpenLoading]);

  return (
    <>
      <Typography mb={2} component="h1" variant="h4">
        Lote: {selectedLote?.name}
      </Typography>

      <Grid mb={2} container direction="row" justifyContent="center" spacing={2}>
        <Grid item xs={12} sm={12} md={3}>
          <Card>
            <CardContent sx={{ alignItems: "center", textAlign: 'center'}}>
              <Typography variant="h5" color={"primary.main"} component="div">
                Em Propagação:
              </Typography>
              <Typography variant="h5" color={"primary.main"} component="div">
                {selectedLote.qtProp}
              </Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} sm={12} md={3}>
          <Card>
            <CardContent sx={{ alignItems: "center", textAlign: 'center'}}>
              <Typography variant="h5" color={"success.main"} component="div">
                Transplantados:
              </Typography>
              <Typography variant="h5" color={"success.main"} component="div">
                {selectedLote.qtPlant}
              </Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} sm={12} md={3}>
          <Card>
            <CardContent sx={{ alignItems: "center", textAlign: 'center'}}>
              <Typography variant="h5" color={"error.light"} component="div">
                Descartados:
              </Typography>
              <Typography variant="h5" color={"error.light"} component="div">
                {selectedLote.qtPropTrashed}
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
          <Typography>Plantas Transplantadas</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <PlantsTable id={id}></PlantsTable>
        </AccordionDetails>
      </Accordion>

      <Accordion>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel1a-content1"
          id="panel1a-header"
        >
          <Typography>Plantas Descartadas</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <TrashedLoteTable id={id}></TrashedLoteTable>
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
