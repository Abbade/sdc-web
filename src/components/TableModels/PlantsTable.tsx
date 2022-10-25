import { Button } from "@mui/material";
import Box from "@mui/material/Box";
import { GridCallbackDetails, GridColDef } from "@mui/x-data-grid";
import Router from "next/router";
import { useEffect, useState } from "react";
import { TrashedLote } from "../../interfaces/LoteInterface";
import { api } from "../../services/apiClient";
import Table from "../Table";

export default function PlantsTable({ id }) {
  const [lotes, setLotes] = useState([] as TrashedLote[]);
  const [total, setTotal] = useState({} as number);

  const [fastSearch, setFastSearch] = useState('');
  const [pageSize, setPageSize] = useState(100);
  const [page, setPage] = useState(0);
  const [rowCount, setRowCount] = useState(1);

  // useEffect(() => {
  //   const get = async (name : string, page: number, pageSize: number) => {
  //     var response = await api.get("/plant", {
  //       params: {
  //         id: id,
  //         page: page,
  //         limit: pageSize
  //       },
  //     });
  //     setLotes(response.data.itens);
  //     setRowCount(response.data.total);
  //   };
  //   get('', 0, 100);
  // }, []);

  useEffect(() => {
    const get = async (name : string, page: number, pageSize: number) => {
      var response = await api.get("/plant", {
        params: {
          id: id,
          page: page,
          limit: pageSize,
          name: fastSearch
        },
      });
      setLotes(response.data.itens);
      setRowCount(response.data.total);
    };
    get(fastSearch, page + 1, pageSize);
  }, [pageSize, page, fastSearch]);

 

  const onPageSizeChange = async (pageSize: number, details: GridCallbackDetails)  => {
    setPageSize(pageSize);
  };

  const onPageChange = async (page: number, details: GridCallbackDetails)  => {
    setPage(page);
  };

  const onFastSearchChange = (event : React.ChangeEvent<HTMLInputElement>) => {
    setFastSearch(event.target.value);
    //get(event.target.value, page, pageSize);
  };



  return (
    <Box sx={{ flexGrow: 1 }}>
      <Table
        columns={columns}
        rows={lotes}
        url="/nursery/create-lote"
        onPageChange={onPageChange}
        onPageSizeChange={onPageSizeChange}
        onFastSearchChange={onFastSearchChange}
        page={page}
        rowCount={rowCount}
        searchName={"Procurar plantas"}
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
    field: "faseCultivo.name",
    headerName: "Fase",
    width: 130,
    renderCell: (params) => {
      console.log(params.row.faseCultivo.name);
      return (
        <div className="MuiDataGrid-cellContent">
          {params.row.faseCultivo.name}
        </div>
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

  { field: "lastTransplant", headerName: "Ultimo Transplante", width: 200 },
  { field: "aclimatationDate", headerName: "Data Aclimatação", width: 200 },
  { field: "vegetationDate", headerName: "Data Vegetação", width: 200 },
  { field: "floweringDate", headerName: "Data Floração", width: 200 },
  { field: "harvestDate", headerName: "Data de Colheita", width: 200 },


 
  // { field: "qtTotal", headerName: "Total", width: 90 },
  // { field: "qtPropTrashed", headerName: "Quantidade", width: 130 },
];
