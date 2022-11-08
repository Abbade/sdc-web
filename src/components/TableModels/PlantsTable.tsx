import { Button } from "@mui/material";
import Box from "@mui/material/Box";
import {
  GridCallbackDetails,
  GridColDef,
  GridSelectionModel,
} from "@mui/x-data-grid";
import { useEffect, useState } from "react";
import { PlantaInterface } from "../../interfaces/PlantaInterface";
import { api } from "../../services/apiClient";
import FormDialog from "../Dialogs/Dialog";
import TrashPlantForm from "../Forms/TrashPlantForm";
import TransplantPlantForm from "../Forms/TransplantPlantForm";
import Table from "../Table";
import { format } from 'date-fns'
import TransformPlantIntoMotherForm from "../Forms/TransformPlantIntoMotherFOrm";
import MovePlantForm from "../Forms/MovePlantForm";

export default function PlantsTable({ id }) {
  const [plants, setPlantas] = useState([] as PlantaInterface[]);
  const [selectedPlants, setSelectedPlants] = useState([] as PlantaInterface[]);

  const [fastSearch, setFastSearch] = useState("");
  const [pageSize, setPageSize] = useState(10);
  const [page, setPage] = useState(0);
  const [rowCount, setRowCount] = useState(1);


  useEffect(() => {
    console.log("render");
    const get = async (name: string, page: number, pageSize: number) => {
      var response = await api.get("/plant", {
        params: {
          id: id,
          page: page,
          limit: pageSize,
          name: fastSearch,
        
        },
      });
      setPlantas(response.data.itens);
      setRowCount(response.data.total);
    };
    get(fastSearch, page + 1, pageSize);
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

  const [openTrash, setOpenTrash] = useState(false);
  const [openTransplant, setOpenTransplant] = useState(false);
  const [openMove, setOpenMove] = useState(false);
  const [openMother, setOpenMother] = useState(false);

  const handleOpen = (type) => {
    // setOpen(true);
    console.log(type)
  };
  const handleClose = () => {
    setOpenTrash(false);
    setOpenTransplant(false);
    setOpenMove(false);
    setOpenMother(false);
    const get = async (name: string, page: number, pageSize: number) => {
      var response = await api.get("/plant", {
        params: {
          id: id,
          page: page,
          limit: pageSize,
          name: fastSearch,
        },
      });
      setPlantas(response.data.itens);
      setRowCount(response.data.total);
    };
    get(fastSearch, page + 1, pageSize);
  };

  const transplantIndividualPlantButton = (params) => {
    return (
      <strong>
        <Button
          variant="contained"
          color="success"
          size="small"
          // style={{ marginLeft: 16 }}
          onClick={() => {
            console.log([params.row]);
            setSelectedPlants([params.row]);
            handleOpen(setOpenTransplant(true));
            // Router.push("nursery/" + params.row.id + "/trash-lote");
          }}
        >
          Transplantar
        </Button>
      </strong>
    );
  };

  const trashIndividualPlantButton = (params) => {
    return (
      <strong>
        <Button
          variant="contained"
          color="success"
          size="small"
          // style={{ marginLeft: 16 }}
          onClick={() => {
            console.log([params.row]);
            setSelectedPlants([params.row]);
            handleOpen(setOpenTrash(true));
            // Router.push("nursery/" + params.row.id + "/trash-lote");
          }}
        >
          Descartar
        </Button>
      </strong>
    );
  };

  const movePlantButton = (params) => {
    return (
      <strong>
        <Button
          variant="contained"
          color="success"
          size="small"
          // style={{ marginLeft: 16 }}
          onClick={() => {
            console.log([params.row]);
            setSelectedPlants([params.row]);
            handleOpen(setOpenMove(true));
            // Router.push("nursery/" + params.row.id + "/trash-lote");
          }}
        >
          Mover
        </Button>
      </strong>
    );
  };

  const transformPlantIntoMotherButton = (params) => {
    return (
      <strong>
        <Button
          variant="contained"
          color="success"
          size="small"
          // style={{ marginLeft: 16 }}
          onClick={() => {
            console.log([params.row]);
            setSelectedPlants([params.row]);
            handleOpen(setOpenMother(true));
            // Router.push("nursery/" + params.row.id + "/trash-lote");
          }}
        >
          Nova Mãe
        </Button>
      </strong>
    );
  };
  
  const columns: GridColDef[] = [
    { field: "id", headerName: "ID", width: 70 },
    { field: "name", headerName: "Codigo", width: 200 },
    { field: "isMotherPlant", headerName: "Matriz", width: 200 },
    

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
            {format(new Date(params.row.lastTransplant), 'dd/MM/yyyy')}
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
            {format(new Date(params.row.aclimatationDate), 'dd/MM/yyyy')}
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
            {format(new Date(params.row.vegetationDate), 'dd/MM/yyyy')}
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
            {format(new Date(params.row.floweringDate), 'dd/MM/yyyy')}
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
            {params.row.harvestDate ? format(new Date(params.row.harvestDate), 'dd/MM/yyyy') : ""}
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
            {format(new Date(params.row.trashDate), 'dd/MM/yyyy')}
          </div>
        );
      },
    },
    {
      field: "Transplantar",
      width: 200,
      renderCell: (params) => {
        return transplantIndividualPlantButton(params);
      },
    },
    {
      field: "Descartar",
      width: 200,
      renderCell: (params) => {
        return trashIndividualPlantButton(params);
      },
    },
    {
      field: "Mover",
      width: 200,
      renderCell: (params) => {
        return movePlantButton(params);
      },
    },
    {
      field: "Matriz",
      width: 200,
      renderCell: (params) => {
        return transformPlantIntoMotherButton(params);
      },
    },
    // { field: "qtTotal", headerName: "Total", width: 90 },
    // { field: "qtPropTrashed", headerName: "Quantidade", width: 130 },
  ];

  return (
    <Box sx={{ flexGrow: 1 }}>
      <Table
        columns={columns}
        rows={plants}
        url="/nursery/create-lote"
        onPageChange={onPageChange}
        onPageSizeChange={onPageSizeChange}
        onFastSearchChange={onFastSearchChange}
        onCheckboxSelection={onCheckboxSelection}
        page={page}
        rowCount={rowCount}
        pageSize={pageSize}
        searchName={"Procurar plantas"}
      />
      <FormDialog onClose={handleClose} open={openTransplant} title={"Transplantar"}>
        <TransplantPlantForm plants={selectedPlants}></TransplantPlantForm>
      </FormDialog>
      <FormDialog onClose={handleClose} open={openTrash} title={"Descartar"}>
        <TrashPlantForm plants={selectedPlants}></TrashPlantForm>
      </FormDialog>
      <FormDialog onClose={handleClose} open={openMother} title={"Nova Mãe"}>
        <TransformPlantIntoMotherForm plants={selectedPlants}></TransformPlantIntoMotherForm>
      </FormDialog>
      <FormDialog onClose={handleClose} open={openMove} title={"Mover"}>
        <MovePlantForm plants={selectedPlants}></MovePlantForm>
      </FormDialog>
    </Box>
  );
}
