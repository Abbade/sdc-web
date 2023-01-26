import { Button } from "@mui/material";
import Box from "@mui/material/Box";
import { GridCallbackDetails, GridColDef } from "@mui/x-data-grid";
import { format } from "date-fns";
import Router from "next/router";
import { useEffect, useState } from "react";
import { TrashedLote } from "../../interfaces/LoteInterface";
import { api } from "../../services/apiClient";
import Table from "../Table";

export default function ActionsTable({ id }) {
  const [lotes, setLotes] = useState([] as any[]);

  const [fastSearch, setFastSearch] = useState("");
  const [pageSize, setPageSize] = useState(10);
  const [page, setPage] = useState(0);
  const [rowCount, setRowCount] = useState(0);

  useEffect(() => {
    console.log("trash render")
    const get = async (name: string, page: number, pageSize: number) => {
      var response = await api.get("/actions", {
        params: {
          id: id,
        },
      });
      console.log(response.data.itens)
      setLotes(response.data.itens);
      setRowCount(response.data.total);
    };
    get(fastSearch, page, pageSize);
  }, [pageSize, page, fastSearch, id]);

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
  };

  return (
    <Box sx={{ flexGrow: 1 }}>
      <Table
      pageSize={pageSize}
        columns={columns}
        rows={lotes}
        searchName={"Atividades"}
        onPageChange={onPageChange}
        onPageSizeChange={onPageSizeChange}
        onFastSearchChange={onFastSearchChange}
        page={page}
        rowCount={rowCount}
        

      />
    </Box>
  );
}


const columns: GridColDef[] = [
  {
    field: "completionDate",
    headerName: "Data",
    width: 130,
    renderCell: (params) => {
      return (
        <div className="MuiDataGrid-cellContent">
          {/* {format(new Date(params.row?.completionDate ? params.row.completionDate:params.row?.scheduledDate ), "dd/MM/yyyy")} */}
        </div>
      );
    },
  },
  {
    field: "name",
    headerName: "Atividade",
    width: 300,
    renderCell: (params) => {
      return (
        <div className="MuiDataGrid-cellContent">
          {params.row.name}
        </div>
      );
    },
  },
  { field: "qtd", headerName: "Quantidade", width: 160 },
 
  { field: "obs", headerName: "OBS", width: 160 },
,{
  field: "status",
  headerName: "Status",
  width: 300,
  renderCell: (params) => {
    return (
      <div className="MuiDataGrid-cellContent">
        {params.row.status}
      </div>
    );
  },
},
  

];
