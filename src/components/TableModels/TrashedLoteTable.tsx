import { Button } from "@mui/material";
import Box from "@mui/material/Box";
import { GridCallbackDetails, GridColDef } from "@mui/x-data-grid";
import Router from "next/router";
import { useEffect, useState } from "react";
import { TrashedLote } from "../../interfaces/LoteInterface";
import { api } from "../../services/apiClient";
import Table from "../Table";

export default function TrashedLoteTable({ id }) {
  const [lotes, setLotes] = useState([] as TrashedLote[]);
  const [total, setTotal] = useState({} as number);

  const [fastSearch, setFastSearch] = useState("");
  const [pageSize, setPageSize] = useState(100);
  const [page, setPage] = useState(0);
  const [rowCount, setRowCount] = useState(0);

  useEffect(() => {
    const get = async (name: string, page: number, pageSize: number) => {
      var response = await api.get("/trashed-lote", {
        params: {
          id: id,
        },
      });
      console.log(response.data);
      setLotes(response.data.itens);
      setRowCount(response.data.total);
    };
    get('', 1, 100);
  }, []);

  useEffect(() => {
    const get = async (name: string, page: number, pageSize: number) => {
      var response = await api.get("/trashed-lote", {
        params: {
          id: id,
        },
      });
      console.log(response.data);
      setLotes(response.data.itens);
      setRowCount(response.data.total);
    };
    get(fastSearch, page, pageSize);
  }, [pageSize, page, fastSearch]);

  const onPageSizeChange = async (
    pageSize: number,
    details: GridCallbackDetails
  ) => {
    setPageSize(pageSize);
  };

  const onPageChange = async (page: number, details: GridCallbackDetails) => {
    setPage(page);
  };

  const onFastSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setFastSearch(event.target.value);
   // get(event.target.value, page, pageSize);
  };

 

  return (
    <Box sx={{ flexGrow: 1 }}>
      <Table
        columns={columns}
        rows={lotes}
        url="/nursery/create-lote"
        searchName={""}
        onPageChange={onPageChange}
        onPageSizeChange={onPageSizeChange}
        onFastSearchChange={onFastSearchChange}
        page={page}
        rowCount={rowCount}
        

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
  { field: "trashDate", headerName: "Data de Descarte", width: 130 },
  {
    field: "trashReason.name",
    headerName: "Motivo",
    width: 130,
    renderCell: (params) => {
      console.log(params.row.trashReason.name);
      return (
        <div className="MuiDataGrid-cellContent">
          {params.row.trashReason.name}
        </div>
      );
    },
  },

  // { field: "qtTotal", headerName: "Total", width: 90 },
  { field: "qtPropTrashed", headerName: "Quantidade", width: 130 },
];
