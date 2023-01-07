import DeleteIcon from "@mui/icons-material/Delete";
import ParkIcon from '@mui/icons-material/Park';
import ZoomInIcon from "@mui/icons-material/ZoomIn";
import Box from "@mui/material/Box";
import {
  GridActionsCellItem,
  GridCallbackDetails,
  GridColumns
} from "@mui/x-data-grid";
import { format } from "date-fns";
import Router from "next/router";
import { useCallback, useEffect, useMemo, useState } from "react";
import { LoteInterface } from "../../interfaces/LoteInterface";
import { api } from "../../services/apiClient";
import { withSSRAuth } from "../../utils/withSSRAuth";
import FormDialog from "../Dialogs/Dialog";
import CreateLoteForm from "../Forms/CreateLoteForm";
import FinishCropForm from "../Forms/FinishCropForm";
import TrashLoteForm from "../Forms/TrashLoteForm";
import Table from "../Table";

const InitialLoteDetailsProps = {
  id: 0,
  name: "",
} as LoteInterface;

export default function Nursery() {
  const [lote, setLote] = useState(InitialLoteDetailsProps);

  //CRIAR CROP INTERFACE
  const [lotes, setLotes] = useState([] as any[]);

  const [fastSearch, setFastSearch] = useState("");
  const [pageSize, setPageSize] = useState(10);
  const [page, setPage] = useState(0);
  const [rowCount, setRowCount] = useState(1);

  const [open, setOpenTrash] = useState(false);
  const [openFinish, setOpenFinish] = useState(false);
  const [openCreate, setOpenCreate] = useState(false);


  useEffect(() => {
    get(fastSearch, page + 1, pageSize);
  }, [pageSize, page, fastSearch]);

  const get = async (name: string, page: number, pageSize: number) => {
    var response = await api.get("/crops", {
      params: {
        name: name,
        page: page,
        limit: pageSize,
      },
    });
    setLotes(response.data.itens);
    setRowCount(response.data.total);
  };

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

  const handleCloseTrash = () => {
    setOpenTrash(false);
    get(fastSearch, page + 1, pageSize);
  };



  const handleTransplanteClose = () => {
    setOpenFinish(false);
    get(fastSearch, page + 1, pageSize);

  };

  const handleOpenCreate = () => {
    setOpenCreate(true);
  };

  const handleCloseCreate = () => {

    setOpenCreate(false)
    get(fastSearch, page + 1, pageSize);

  };


  const handleOpenTrashLote = useCallback(
    (lote: LoteInterface) => () => {
      setLote(lote);
      setOpenTrash(true);
    },
    []
  );

  const handleOpenFinish = useCallback(
    (lote: LoteInterface) => () => {
      setLote(lote);
      setOpenFinish(true);
    },
    []
  );

  const handleOpenDetails = useCallback(
    (lote: LoteInterface) => () => {
      setLote(lote);
      Router.push("/nursery/" + lote.id);
      console.log(lote);
    },
    []
  );

  const optionsImport = [
    { title: 'Criar Novo Lote', action: handleOpenCreate },
  ]

  const columns = useMemo<GridColumns<any>>(
    () => [
      { field: "id", headerName: "ID", width: 70 },
      {
        field: "cropDate",
        headerName: "Data de Colheita",
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
        field: "genetic.name",
        headerName: "Genética",
        width: 100,
        renderCell: (params) => {
          // console.log(params.row.genetic.name)
          return (
            <div className="MuiDataGrid-cellContent">
              {params.row.genetics.nick}
            </div>
          );
        },
      },
      { field: "name", headerName: "Código", width: 130 },
      { field: "qtPlants", headerName: "Nº de Plantas", width: 130 },

      {
        field: "fasesCrop.name",
        headerName: "Fase de Colheita",
        width: 130,
        renderCell: (params) => {
          // console.log(params.row.genetic.name)
          return (
            <div className="MuiDataGrid-cellContent">
              {params.row.fasesCrop.name}
            </div>
          );
        },
      },
      {
        field: "time",
        headerName: "Dias de Secagem",
        width: 130,
        renderCell: (params) => {
          // console.log(params.row.genetic.name)
          return (
            <div className="MuiDataGrid-cellContent">
              {

                params.row.dryingEndDate ? Math.round(Math.abs((Date.parse(params.row.cropDate) - Date.parse(params.row.dryingEndDate)) / (24 * 60 * 60 * 1000))) :
                  Math.round(Math.abs((Date.parse(params.row.cropDate) - Date.now()) / (24 * 60 * 60 * 1000)))
              }
            </div>
          );
        },
      },
      {
        field: "location.name",
        headerName: "Local",
        width: 130,
        renderCell: (params) => {
          // console.log(params.row.genetic.name)
          return (
            <div className="MuiDataGrid-cellContent">
              {params.row.location.name}
            </div>
          );
        },
      },

      { field: "cropFlowerWetMass", headerName: "Massa Úmida", width: 130 },

      { field: "cropDriedFlowerMass", headerName: "Massa Seca", width: 130 },
      {
        field: "humidity",
        headerName: "Teor de Umidade (%)",
        width: 130,
        renderCell: (params) => {
          // console.log(params.row.genetic.name)
          return (
            <div className="MuiDataGrid-cellContent">
              {params.row.cropDriedFlowerMass ? (params.row.cropDriedFlowerMass / params.row.cropFlowerWetMass) * 100 + "%" : params.row.cropDriedFlowerMass}
            </div>
          );
        },
      },
      {
        field: "actions",
        type: "actions",
        width: 100,
        getActions: (params) => [
          <GridActionsCellItem
            key="detail"
            icon={<ZoomInIcon />}
            label="Detalhes"
            onClick={handleOpenDetails(params.row)}
          />,
          <GridActionsCellItem
            key="final"
            icon={<ParkIcon />}
            label="Finalizar"
            title="Finalizar"
            onClick={handleOpenFinish(params.row)}
          />,
          <GridActionsCellItem
            key="delete"
            icon={<DeleteIcon />}
            label="Delete"
            title="Descartar"
            onClick={handleOpenTrashLote(params.row)}
          />,
        ],
      },
    ],
    [handleOpenTrashLote, handleOpenDetails, handleOpenFinish]
  );

  return (
    <Box sx={{ flexGrow: 1 }}>
      <Table
        columns={columns}
        rows={lotes}
        onFastSearchChange={onFastSearchChange}
        onPageChange={onPageChange}
        onPageSizeChange={onPageSizeChange}
        page={page}
        rowCount={rowCount}
        pageSize={pageSize}
        searchName="Procurar Lotes"
        onAdd={handleOpenCreate}
      // url="/nursery/create-lote"

      />
      <FormDialog
        onClose={handleCloseTrash}
        open={open}
        title={"Descartar Lote " + lote?.name}
      >
        <TrashLoteForm onClose={handleCloseTrash} selectedLote={lote}></TrashLoteForm>
      </FormDialog>
      <FormDialog
        onClose={handleTransplanteClose}
        open={openFinish}
        title={"Transplantar " + lote?.name}
      >
        <FinishCropForm onClose={handleTransplanteClose} crop={lote}></FinishCropForm>
      </FormDialog>
      <FormDialog
        onClose={handleCloseCreate}
        open={openCreate}
        title={"Novo Lote " + lote?.name}
      >
        <CreateLoteForm onClose={handleCloseCreate}></CreateLoteForm>
      </FormDialog>
    </Box>
  );
}

export const getServerSideProps = withSSRAuth(async (ctx) => {
  return {
    props: {},
  };
});
