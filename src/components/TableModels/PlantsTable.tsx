import { Button } from "@mui/material";
import Box from "@mui/material/Box";
import { GridColDef } from "@mui/x-data-grid";
import Router from "next/router";
import { useEffect, useState } from "react";
import { TrashedLote } from "../../interfaces/LoteInterface";
import { api } from "../../services/apiClient";
import Table from "../Table";

export default function PlantsTable({ id }) {
  const [lotes, setLotes] = useState([] as TrashedLote[]);
  const [total, setTotal] = useState({} as number);

  useEffect(() => {
    console.log(id);
    const getLotes = async () => {
      var response = await api.get("/plant", {
        params: {
          id: id,
        },
      });
      console.log(response.data);
      setLotes(response.data.itens);
      setTotal(response.data.total);
    };

    getLotes();
  }, []);

  return (
    <Box sx={{ flexGrow: 1 }}>
      <Table
        columns={columns}
        rows={lotes}
        url="/nursery/create-lote"
        searchName={""}
      />
      {/* <Can permissions={["lote.list"]}>
        <div>Métricas</div>
      </Can> */}
    </Box>
  );
}

const renderDetailsButton = (params) => {
  return (
    <strong>
      <Button
        variant="contained"
        color="error"
        size="small"
        style={{ marginLeft: 16 }}
        onClick={() => {
          Router.push("nursery/" + params.row.id + "/trash-lote");
        }}
      >
        Descartar
      </Button>
    </strong>
  );
};

const columns: GridColDef[] = [
  { field: "id", headerName: "ID", width: 70 },
  { field: "name", headerName: "Codigo", width: 200 },
  {
    field: "genetic.nick",
    headerName: "Genética",
    width: 130,
    renderCell: (params) => {
      console.log(params.row.genetic.nick);
      return (
        <div className="MuiDataGrid-cellContent">{params.row.genetic.nick}</div>
      );
    },
  },

  {
    field: "recipiente.name",
    headerName: "Recipiente",
    width: 130,
    renderCell: (params) => {
      console.log(params.row.recipiente.name);
      return (
        <div className="MuiDataGrid-cellContent">
          {params.row.recipiente.name}
        </div>
      );
    },
  },

  {
    field: "location.name",
    headerName: "Local",
    width: 130,
    renderCell: (params) => {
      console.log(params.row.location.name);
      return (
        <div className="MuiDataGrid-cellContent">
          {params.row.location.name}
        </div>
      );
    },
  },

  // { field: "qtTotal", headerName: "Total", width: 90 },
  // { field: "qtPropTrashed", headerName: "Quantidade", width: 130 },
];
