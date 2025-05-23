import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import ZoomInIcon from "@mui/icons-material/ZoomIn";
import Box from "@mui/material/Box";
import {
  GridActionsCellItem,
  GridCallbackDetails,
  GridColDef,
  GridSelectionModel,
} from "@mui/x-data-grid";
import Router from "next/router";

import { format } from "date-fns";
import React, { useCallback, useContext, useEffect, useState } from "react";
import { FilterProp, PlantsContext } from "../../contexts/PlantsContext";
import { PlantaInterface } from "../../interfaces/PlantaInterface";
import FormDialog from "../Dialogs/Dialog";
import ChangePlantStageForm from "../Forms/ChangePlantStageForm";
import FilterPlantForm from "../Forms/FilterPlantForm";
import MovePlantForm from "../Forms/MovePlantForm";
import TransformPlantIntoMotherForm from "../Forms/TransformPlantIntoMotherForm";
import TransplantPlantForm from "../Forms/TransplantPlantForm";
import TrashPlantForm from "../Forms/TrashPlantForm";
import Table from "../Table";
import { AlertContext } from "../../contexts/AlertContext";
import CreateCropForm from "../Forms/CreateCropForm";
import CreateActionGroup, { ItemType } from "../Forms/action/CreateActionGroup";
import { api } from "../../services/apiClient";
import { IOptionsImport } from "../SplitButton";
import { TYPE_PLANT } from "../../constants/ACTION_TYPE";


export default function PlantsTable({ id }) {
  const {
    plants = [],
    fastSearch,
    setFastSearch,
    pageSize = 10,
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

  const { showAlert, setOpenLoading } = useContext(AlertContext);

  const [selectedPlants, setSelectedPlants] = useState([] as PlantaInterface[]);
  const [openTrash, setOpenTrash] = useState(false);
  const [openChangeStage, setChangeStage] = useState(false);
  const [openTransplant, setOpenTransplant] = useState(false);
  const [openMove, setOpenMove] = useState(false);
  const [openMother, setOpenMother] = useState(false);
  const [openCrop, setOpenCrop] = useState(false);
  const [openFilter, setOpenFilter] = useState(false);
  const [actionsTypes, setActionsTypes] = useState<IOptionsImport[]>([]);
  const [actionTypeId, setActionTypeId] = useState(-1);
  const [actionTypeName, setActionTypeName] = useState("Tranplante");

  useEffect(() => {
    if (id > 0) setFilter({ idLote: id } as FilterProp);
  }, [id, setFilter, setOpenLoading]);

  useEffect(() => {
    const getActionType = async () => {
      setOpenLoading(true);
      const types = await api.get("/actionsTypes");
      setActionsTypes(types.data.itens?.filter(x => x.type === TYPE_PLANT.PLANTS_TYPES));
      setOpenLoading(false);
    };

    getActionType();
  }, [setOpenLoading]);

  useEffect(() => {
    if (actionTypeId > 0) {
      setActionTypeName(
        actionsTypes.filter((x) => x.id === actionTypeId)[0].name
      );
    }
  }, [actionTypeId, actionsTypes]);

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
    const selectedIDs = new Set(ids);
    const selectedRowData = plants.filter((row) => {
      return selectedIDs.has(row.id);
    });
    setSelectedPlants(selectedRowData);
  };

  const onFastSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setFastSearch(event.target.value);
    //get(event.target.value, page, pageSize);
  };

  const optionsImport = [
    {
      title: "Transplante",
      icon: <ArrowDropDownIcon />,
      action: setOpenTransplant,
    },
    { title: "Descarte", icon: <ArrowDropDownIcon />, action: setOpenTrash },
    { title: "Mover", icon: <ArrowDropDownIcon />, action: setOpenMove },
    { title: "Matriz", icon: <ArrowDropDownIcon />, action: setOpenMother },
    {
      title: "Fase de Cultivo",
      icon: <ArrowDropDownIcon />,
      action: setChangeStage,
    },
    {
      title: "Colher",
      icon: <ArrowDropDownIcon />,
      action: setOpenCrop,
    },
  ];

  const handleOpenSplitButton = (id: number) => {
    if (selectedPlants.length > 0) setActionTypeId(id);
    //optionsImport[index].action(true);
    else showAlert("Selecione ao menos uma planta", "warning");
  };

  const handleClose = () => {
    console.log("teste");

    setActionTypeId(-1);
    setRefresh(!refresh);
  };

  const handleOpenDetails = useCallback(
    (planta: PlantaInterface) => () => {
      Router.push("/plants/" + planta.id);
    },
    []
  );

  const columns: GridColDef[] = [
    { field: "id", headerName: "ID", width: 70 },
    { field: "name", headerName: "Codigo", width: 200 },
    {
      field: "isMotherPlant",
      headerName: "Matriz",
      width: 70,
      renderCell: (params) => {
        return (
          <div className="MuiDataGrid-cellContent">
            {params.row.isMotherPlant ? "Sim" : "Não"}
          </div>
        );
      },
    },
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
      width: 130,
      renderCell: (params) => {
        return (
          <div className="MuiDataGrid-cellContent">
            {params.row.location.name}
          </div>
        );
      },
    },
    {
      field: "lastTransplant",
      headerName: "Ultimo Transplante",
      width: 140,
      renderCell: (params) => {
        return (
          <div className="MuiDataGrid-cellContent">
            {format(new Date(params.row.lastTransplant), "dd/MM/yyyy")}
          </div>
        );
      },
    },
    {
      field: "aclimatationDate",
      headerName: "Data Aclimatação",
      width: 130,
      renderCell: (params) => {
        return (
          <div className="MuiDataGrid-cellContent">
            {params.row.aclimatationDate
              ? format(new Date(params.row.aclimatationDate), "dd/MM/yyyy")
              : ""}
          </div>
        );
      },
    },
    {
      field: "vegetationDate",
      headerName: "Data Vegetação",
      width: 130,
      renderCell: (params) => {
        return (
          <div className="MuiDataGrid-cellContent">
            {params.row.vegetationDate
              ? format(new Date(params.row.vegetationDate), "dd/MM/yyyy")
              : ""}
          </div>
        );
      },
    },
    {
      field: "floweringDate",
      headerName: "Data Floração",
      width: 130,
      renderCell: (params) => {
        return (
          <div className="MuiDataGrid-cellContent">
            {params.row.floweringDate
              ? format(new Date(params.row.floweringDate), "dd/MM/yyyy")
              : ""}
          </div>
        );
      },
    },
    {
      field: "harvestDate",
      headerName: "Data Colheita",
      width: 130,
      renderCell: (params) => {
        return (
          <div className="MuiDataGrid-cellContent">
            {params.row.cropDate
              ? format(new Date(params.row.cropDate), "dd/MM/yyyy")
              : ""}
          </div>
        );
      },
    },
    {
      field: "trashDate",
      headerName: "Data Descarte",
      width: 130,
      renderCell: (params) => {
        return (
          <div className="MuiDataGrid-cellContent">
            {params.row.trashDate
              ? format(new Date(params.row.trashDate), "dd/MM/yyyy")
              : ""}
          </div>
        );
      },
    },
    {
      field: "actions",
      type: "actions",
      width: 100,
      renderCell: (params) => {
        return (
          <GridActionsCellItem
            key="detail"
            icon={<ZoomInIcon />}
            label="Detalhes"
            onClick={handleOpenDetails(params.row)}
          />
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
        optionsImport={actionsTypes}
        onFilter={() => {
          console.log("teste");
          setOpenFilter(true);
        }}
        onOpenSplitButton={handleOpenSplitButton}
        totalFilter={filter?.totalFilter}
      />
      <FormDialog
        onClose={() => setOpenFilter(false)}
        open={openFilter}
        title={"Filtro"}
      >
        <FilterPlantForm onClose={() => setOpenFilter(false)}></FilterPlantForm>
      </FormDialog>
      <FormDialog
        onClose={handleClose}
        open={openTransplant}
        title={"Transplantar"}
      >
        <TransplantPlantForm
          onClose={handleClose}
          plants={selectedPlants}
        ></TransplantPlantForm>
      </FormDialog>
      <FormDialog
        onClose={handleClose}
        open={actionTypeId !== -1}
        size={"xl"}
        title={actionTypeName}
      >
        <CreateActionGroup
        onClose={handleClose}
          form={{
            title: actionTypeName,
            desc: actionTypeName,
            start: new Date(),
            end: new Date(),
            allDay: false,
            actions: [
              {
                actionTypeId: actionTypeId,
                plants: selectedPlants,
                completed: false
              },
            ],
          }}
          fromAction={true}
        ></CreateActionGroup>
      </FormDialog>
      <FormDialog onClose={handleClose} open={openTrash} title={"Descartar"}>
        <TrashPlantForm plants={selectedPlants}></TrashPlantForm>
      </FormDialog>
      <FormDialog onClose={handleClose} open={openMother} title={"Nova Mãe"}>
        <TransformPlantIntoMotherForm
          plants={selectedPlants}
        ></TransformPlantIntoMotherForm>
      </FormDialog>
      <FormDialog onClose={handleClose} open={openMove} title={"Mover"}>
        <MovePlantForm plants={selectedPlants}></MovePlantForm>
      </FormDialog>
      <FormDialog
        onClose={handleClose}
        open={openChangeStage}
        title={"Fase de Cultivo"}
      >
        <ChangePlantStageForm plants={selectedPlants}></ChangePlantStageForm>
      </FormDialog>
      <FormDialog
        onClose={handleClose}
        open={openCrop}
        title={"Colher Plantas"}
      >
        <CreateCropForm plants={selectedPlants}></CreateCropForm>
      </FormDialog>
    </Box>
  );
}
