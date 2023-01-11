import { useRouter } from "next/router";
import { useContext, useEffect, useState } from "react";
import { api } from "../../../services/apiClient";
import { withSSRAuth } from "../../../utils/withSSRAuth";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import { Can } from "../../../components/Can";
import PlantsTable from "../../../components/TableModels/PlantsTable";
import { CropInterface } from "../../../interfaces/CropInterface";
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
import { PlantProvider } from "../../../contexts/PlantsContext";
import CroppedPlantsTable from "../../../components/TableModels/CroppedPlantsTable";
import ActionCropsTable from "../../../components/TableModels/ActionCropsTable";

export default function CropDetail() {
  const { setOpenLoading } = useContext(AlertContext);

  const routing = useRouter();
  const { id } = routing.query;
  const theme = useTheme();
  const [selectedCrop, setSelectedCrop] = useState({} as CropInterface);

  useEffect(() => {
    const getCrop = async () => {
      setOpenLoading(true);
      var response = await api.get("/crops", id ? { params: { id: id } } : {});
      setOpenLoading(false);
      console.log(id)
      console.log(response.data);
      setSelectedCrop(response.data.itens[0]);
    };
    if (id) {
      getCrop();
    }
  }, [id, setOpenLoading]);

  return (
    <>
      <Typography mb={2} component="h1" variant="h4">
        Crop: {selectedCrop?.name}
      </Typography>

      <Grid mb={2} container direction="row" justifyContent="center" spacing={2}>
        <Grid item xs={12} sm={12} md={3}>
          <Card>
            <CardContent sx={{ alignItems: "center", textAlign: 'center'}}>
              <Typography variant="h5" color={"primary.main"} component="div">
                Qtd. Plantas:
              </Typography>
              <Typography variant="h5" color={"primary.main"} component="div">
                {selectedCrop.qtPlants}
              </Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} sm={12} md={3}>
          <Card>
            <CardContent sx={{ alignItems: "center", textAlign: 'center'}}>
              <Typography variant="h5" color={"success.main"} component="div">
                Massa Úmida:
              </Typography>
              <Typography variant="h5" color={"success.main"} component="div">
                {selectedCrop.cropFlowerWetMass}
              </Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} sm={12} md={3}>
          <Card>
            <CardContent sx={{ alignItems: "center", textAlign: 'center'}}>
              <Typography variant="h5" color={"error.light"} component="div">
                Massa Seca:
              </Typography>
              <Typography variant="h5" color={"error.light"} component="div">
              {selectedCrop?.cropDriedFlowerMass ? selectedCrop.cropDriedFlowerMass : "Em Secagem"}

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
        <CroppedPlantsTable id={selectedCrop?.id}></CroppedPlantsTable>
        </AccordionDetails>
        <AccordionDetails>
        <ActionCropsTable id={selectedCrop?.id}></ActionCropsTable>
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
