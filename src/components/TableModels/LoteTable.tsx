import DeleteIcon from "@mui/icons-material/Delete";
import ZoomInIcon from "@mui/icons-material/ZoomIn";
import Box from "@mui/material/Box";
import {
  GridActionsCellItem,
  GridCallbackDetails,
  GridColumns,
} from "@mui/x-data-grid";
import Router from "next/router";
import { useCallback, useEffect, useMemo, useState } from "react";
import { LoteInterface } from "../../interfaces/LoteInterface";
import { api } from "../../services/apiClient";
import { withSSRAuth } from "../../utils/withSSRAuth";
import FormDialog from "../Dialogs/Dialog";
import CreatePlantForm from "../Forms/CreatePlantForm";
import TrashLoteForm from "../Forms/TrashLoteForm";
import Table from "../Table";
import ParkIcon from '@mui/icons-material/Park';
import CreateLoteForm from "../Forms/action/CreateLoteForm";

const InitialLoteDetailsProps = {
  id: 0,
  name: "",
} as LoteInterface;

export default function Nursery() {
  const [lote, setLote] = useState(InitialLoteDetailsProps);
  const [lotes, setLotes] = useState([] as LoteInterface[]);

  const [fastSearch, setFastSearch] = useState("");
  const [pageSize, setPageSize] = useState(10);
  const [page, setPage] = useState(0);
  const [rowCount, setRowCount] = useState(1);

  const [open, setOpenTrash] = useState(false);
  const [openTransplante, setOpenTransplante] = useState(false);
  const [openCreate, setOpenCreate] = useState(false);
  

  useEffect(() => {
    get(fastSearch, page + 1, pageSize);
  }, [pageSize, page, fastSearch]);

  const get = async (name: string, page: number, pageSize: number) => {
    var response = await api.get("/lote", {
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
    setOpenTransplante(false);
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

  const handleOpenTransplante = useCallback(
    (lote: LoteInterface) => () => {
      setLote(lote);
      setOpenTransplante(true);
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

  const columns = useMemo<GridColumns<LoteInterface>>(
    () => [
      { field: "id", headerName: "ID", width: 70 },
      {
        field: "genetic.name",
        headerName: "Genética",
        width: 130,
        renderCell: (params) => {
          // console.log(params.row.genetic.name)
          return (
            <div className="MuiDataGrid-cellContent">
              {params.row.genetic.name}
            </div>
          );
        },
      },

      { field: "name", headerName: "Código", width: 130 },
      { field: "qtProp", headerName: "Em Propagação", width: 130 },
      { field: "qtPlant", headerName: "Transplantes", width: 130 },
      { field: "qtPropTrashed", headerName: "Descartes", width: 130 },
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
            key="transpl"
            icon={<ParkIcon />}
            label="Transplante"
            title="Transplantar"
            onClick={handleOpenTransplante(params.row)}
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
    [handleOpenTrashLote, handleOpenDetails, handleOpenTransplante]
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
        open={openTransplante}
        title={"Transplantar " + lote?.name}
      >
        <CreatePlantForm onClose={handleTransplanteClose} selectedLote={lote}></CreatePlantForm>
      </FormDialog>
      <FormDialog
        onClose={handleCloseCreate}
        open={openCreate}
        size='xl'
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
