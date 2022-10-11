import { useContext, useEffect, useState } from "react";
import Router from "next/router";
import Box from "@mui/material/Box";
import { AuthContext } from "../../contexts/AuthContext";
import { setupAPIClient } from "../../services/api";
import { api } from "../../services/apiClient";
import { withSSRAuth } from "../../utils/withSSRAuth";
import { Can } from "../Can";
import Table from "../Table";
import { Button, Typography } from "@mui/material";
import { Modal } from "@mui/material";
import { GridColDef, GridValueGetterParams } from "@mui/x-data-grid";
import { LoteInterface } from "../../interfaces/LoteInterface";
import React from "react";
import TrashLote from "../../pages/nursery/[id]/trash-lote";
import Dialog from "../Dialogs/Dialog";
import SimpleDialogDemo from "../Dialogs/Dialog";
import SimpleDialog from "../Dialogs/Dialog";
import path from "path";

export default function Nursery() {

  

  const renderDetailsButton = (params) => {
    return (
      <strong>
        <Button
          variant="contained"
          color="secondary"
          size="small"
          style={{ marginLeft: 16 }}
          onClick={() => {
            Router.push('nursery/' + params.row.id);

            //handleOpen()
          }}
        >
          Detalhes
        </Button>
      </strong>
    )
  }


  const renderTrashButton = (params) => {
    return (
      <strong>
        <Button
          variant="contained"
          color="error"
          size="small"
          style={{ marginLeft: 16 }}
          onClick={(e) => {
            console.log(e)
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
    {
      field: "genetic.name", headerName: "Genética", width: 130, renderCell: (params) => {
        // console.log(params.row.genetic.name)
        return <div className="MuiDataGrid-cellContent">{params.row.genetic.name}</div>;
      },
    },

    { field: "name", headerName: "Código", width: 130 },
    { field: "qtProp", headerName: "Em Propagação", width: 130 },
    { field: "qtPlant", headerName: "Transplantes", width: 130 },
    { field: "qtPropTrashed", headerName: "Descartes", width: 130 },
    {
      field: 'detail',
      headerName: '',
      width: 150,
      renderCell: renderDetailsButton,
    }, {
      field: 'trash',
      headerName: '',
      width: 150,
      renderCell: renderTrashButton,
    }, 
    
  ];




  const [lotes, setLotes] = useState([] as LoteInterface[]);
  const [total, setTotal] = useState({} as number)


  useEffect(() => {
    const getLotes = async () => {
      var response = await api.get("/lote");
      console.log(response.data)
      setLotes(response.data.itens);
      setTotal(response.data.total)
    };

    getLotes();

  }, []);



  return (
    <Box sx={{ flexGrow: 1 }}>


      <Table columns={columns} rows={lotes} searchName="Procurar Lotes" url="/nursery/create-lote" />
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


