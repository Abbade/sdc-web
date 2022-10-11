import { useContext, useEffect, useState } from "react";
import Router, { useRouter } from "next/router";
import Box from "@mui/material/Box";
import { AuthContext } from "../../contexts/AuthContext";
import { setupAPIClient } from "../../services/api";
import { api } from "../../services/apiClient";
import { withSSRAuth } from "../../utils/withSSRAuth";
import { Can } from "../Can";
import Table from "../Table";
import { Button, Typography } from "@mui/material";
import { GridColDef, GridValueGetterParams } from "@mui/x-data-grid";
import { LoteInterface, TrashedLote } from "../../interfaces/LoteInterface";

export default function TrashedLoteTable({id}) {
  const [lotes, setLotes] = useState([] as TrashedLote[]);
  const [total, setTotal] = useState({} as number)
  const [idLote, setIdLote] = useState ({id})

  useEffect(() => {
    console.log(id)
    const getLotes = async () => {
      
      var response = await api.get("/trashed-lote", {params: {
        id: id
      }});
      console.log(response.data)
      setLotes(response.data.itens);
      setTotal(response.data.total)
    };

    getLotes();

  }, []);



  return (
    <Box sx={{ flexGrow: 1 }}>
      <Table columns={columns} rows={lotes} url="/nursery/create-lote" searchName={""} />
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
                  Router.push('nursery/' + params.row.id + '/trash-lote')
              }}
          >
              Descartar
          </Button>
      </strong>
  )
}

const columns: GridColDef[] = [
  { field: "id", headerName: "ID", width: 70 },
  { field: "trashReason.name", headerName: "Motivo", width: 130,    renderCell: (params) => {
    console.log(params.row.trashReason.name)
    return <div className="MuiDataGrid-cellContent">{params.row.trashReason.name}</div>;
  }, },
 
  // { field: "qtTotal", headerName: "Total", width: 90 },
  { field: "qtPropTrashed", headerName: "Quantidade", width: 130 },

];

