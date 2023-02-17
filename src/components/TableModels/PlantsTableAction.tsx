import Box from "@mui/material/Box";
import {
  GridCallbackDetails,
  GridColDef,
  GridSelectionModel,
} from "@mui/x-data-grid";
import Router from "next/router";

import React, { useCallback, useContext, useEffect, useState } from "react";
import { AlertContext } from "../../contexts/AlertContext";
import { FilterProp, PlantsContext } from "../../contexts/PlantsContext";
import { PlantaInterface } from "../../interfaces/PlantaInterface";
import FormDialog from "../Dialogs/Dialog";
import { ActionItem } from "../Forms/action/CreateAction";
import FilterPlantForm from "../Forms/FilterPlantForm";
import Table from "../Table";

export interface PlantsTableInterface{
  selectedPlants: number[];
  setSelectedPlants:  React.Dispatch<React.SetStateAction<number[]>>;
  onCheckboxSelect : (selecteds : number[]) => void;
} 

export default function PlantsTableAction({selectedPlants, setSelectedPlants, onCheckboxSelect} : PlantsTableInterface) {
  const {
    plants = [],
    fastSearch,
    setFastSearch,
    pageSize = 100,
    setPageSize,
    page = 0,
    setPage,
    rowCount = 1,
    setRowCount,
    setFilter,
    setRefresh,
    filter,
    loadingTable,
    refresh,
  } = useContext(PlantsContext);

  const { showAlert } = useContext(AlertContext);

  //const [selectedPlants, setSelectedPlants] = useState([] as PlantaInterface[]);
  const [openFilter, setOpenFilter] = useState(false);



  const onPageSizeChange = async (
    pageSize: number,
    details: GridCallbackDetails
  ) => {
    setPageSize(pageSize);
  };

  const onPageChange = async (page: number, details: GridCallbackDetails) => {
    setPage(page);
  };

  const onCheckboxSelection = async (
    ids: GridSelectionModel,
    details: GridCallbackDetails<any>
  ) => {
    console.log(ids);
    const selectedIDs = new Set(ids);
    let idsObj = ids.map((id) => id as number );
    onCheckboxSelect(idsObj)

    setSelectedPlants(idsObj);
  };

  const onFastSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setFastSearch(event.target.value);
    //get(event.target.value, page, pageSize);
  };

  const handleOpenDetails = useCallback(
    (planta: PlantaInterface) => () => {
      Router.push("/plants/" + planta.id);
    },
    []
  );

  const columns: GridColDef[] = [
    { field: "name", headerName: "Codigo", width: 160 },
    {
      field: "genetic.nick",
      headerName: "Genética",
      width: 130,
      renderCell: (params) => {
        return (
          <div className="MuiDataGrid-cellContent">
            {params.row.genetic.nick}
          </div>
        );
      },
    },

    {
      field: "faseCultivo.name",
      headerName: "Fase",
      width: 130,
      renderCell: (params) => {
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
      width: 110,
      renderCell: (params) => {
        return (
          <div className="MuiDataGrid-cellContent">
            {params.row.location.name}
          </div>
        );
      },
    },
  ];

  return (
    <Box sx={{ flexGrow: 1 }}>
      <Table
        columns={columns}
        rows={plants}
        // url="/nursery/create-lote"
        loading={loadingTable}
        onPageChange={onPageChange}
        onPageSizeChange={onPageSizeChange}
        onFastSearchChange={onFastSearchChange}
        onCheckboxSelection={onCheckboxSelection}
        page={page}
        rowCount={rowCount}
        pageSize={pageSize}
        searchName={"Procurar plantas"}
        onFilter={() => {
          console.log("teste");
          setOpenFilter(true);
        }}
        selection={true}
        totalFilter={filter?.totalFilter}
        height="300px"
      />
      <FormDialog
        onClose={() => setOpenFilter(false)}
        open={openFilter}
        title={"Filtro"}
      >
        <FilterPlantForm onClose={() => setOpenFilter(false)}></FilterPlantForm>
      </FormDialog>
    </Box>
  );
}
