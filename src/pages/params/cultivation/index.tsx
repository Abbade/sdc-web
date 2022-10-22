import { Typography } from "@mui/material";
import { useRouter } from "next/router";
import { useContext, useEffect } from "react";
import { Can } from "../../../components/Can";
import PlantsTable from "../../../components/TableModels/PlantsTable";
import { AuthContext } from "../../../contexts/AuthContext";
import { api } from "../../../services/apiClient";
import { withSSRAuth } from "../../../utils/withSSRAuth";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import { AnchorLink } from "../../../components/Layout";

export default function LoteDashboard() {
  const { user, signOut, isAuthenticated } = useContext(AuthContext);

  const routing = useRouter();

  useEffect(() => {}, []);

  return (
    <>
      <Typography component="h1" variant="h4" sx={{ pt: 1, pb: 1 }}>
        Páginas de parâmetro
      </Typography>
      <Can permissions={["lote.list"]}>
        <List>
          <ListItem disablePadding>

            <ListItemButton href="/params/cultivation/fase-cultivo/create-fase-cultivo">
              <ListItemText primary="Fase Cultivo" />
            </ListItemButton>

      
          </ListItem>
          <ListItem disablePadding>
            <ListItemButton component="a" href="#simple-list">
              <ListItemText primary="Spam" />
            </ListItemButton>
          </ListItem>
        </List>
      </Can>
    </>
  );
}

export const getServerSideProps = withSSRAuth(async (ctx) => {
  return {
    props: {},
  };
});
