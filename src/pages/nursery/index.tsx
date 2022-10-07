import { useContext, useEffect, useState } from "react";
import Router from "next/router";
import Box from "@mui/material/Box";
import { AuthContext } from "../../contexts/AuthContext";
import { setupAPIClient } from "../../services/api";
import { api } from "../../services/apiClient";
import { withSSRAuth } from "../../utils/withSSRAuth";
import { Can } from "../../components/Can";
import TableToolbar from "../../components/Table/TableToolbar";
import Table from "../../components/Table";
import { Typography } from "@mui/material";
import { GridColDef, GridValueGetterParams } from "@mui/x-data-grid";
import { LoteInterface } from "../../interfaces/LoteInterface";

export default function Nursery() {
  const [lotes, setLotes] = useState([] as LoteInterface[]);

  useEffect(() => {
    const getLotes = async () => {
      var response = await api.get("/lote");
      setLotes(response.data);
    };

    getLotes();
  }, []);

  return (
    <Box sx={{ flexGrow: 1 }}>
      <Table columns={columns} rows={lotes} searchName="Procurar Lotes" />
      {/* <Can permissions={["lote.list"]}>
        <div>Métricas</div>
      </Can> */}
    </Box>
  );
}

export const getServerSideProps = withSSRAuth(async (ctx) => {
  return {
    props: {},
  };
});

const columns: GridColDef[] = [
  { field: "id", headerName: "ID", width: 70 },
  { field: "name", headerName: "Código", width: 130 },
  { field: "qtTotal", headerName: "Total", width: 90 },
  { field: "qtProp", headerName: "Total Propagado", width: 130 },
  { field: "qtPropTrashed", headerName: "Total despejado", width: 130 },
  { field: "qtPlant", headerName: "Total Planta", width: 130 },
];
