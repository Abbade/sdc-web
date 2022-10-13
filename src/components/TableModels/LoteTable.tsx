import Box from "@mui/material/Box";
import { useCallback, useEffect, useMemo, useState } from "react";
import DeleteIcon from "@mui/icons-material/Delete";
import ZoomInIcon from "@mui/icons-material/ZoomIn";
import { GridActionsCellItem, GridColumns } from "@mui/x-data-grid";
import { LoteInterface } from "../../interfaces/LoteInterface";
import { api } from "../../services/apiClient";
import { withSSRAuth } from "../../utils/withSSRAuth";
import FormDialog from "../Dialogs/Dialog";
import TrashLoteForm from "../Forms/TrashLoteForm";
import Table from "../Table";

const InitialLoteDetailsProps = {
  id: 0,
  name: "",
} as LoteInterface;

export default function Nursery() {
  const [open, setOpen] = useState(false);
  const [lote, setLote] = useState(InitialLoteDetailsProps);
  const [lotes, setLotes] = useState([] as LoteInterface[]);
  const [total, setTotal] = useState({} as number);

  useEffect(() => {
    const getLotes = async () => {
      var response = await api.get("/lote");
      setLotes(response.data.itens);
      setTotal(response.data.total);
    };

    getLotes();
  }, []);

  const handleClose = () => {
    setOpen(false);
  };

  const handleOpenTrashLote = useCallback(
    (lote: LoteInterface) => () => {
      setLote(lote);
      setOpen(true);
    },
    []
  );

  const handleOpenDetails = useCallback(
    (lote: LoteInterface) => () => {
      console.log(lote);
    },
    []
  );

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
        width: 80,
        getActions: (params) => [
          <GridActionsCellItem
            key="detail"
            icon={<ZoomInIcon />}
            label="Detalhes"
            onClick={handleOpenDetails(params.row)}
          />,
          <GridActionsCellItem
            key="delete"
            icon={<DeleteIcon />}
            label="Delete"
            onClick={handleOpenTrashLote(params.row)}
          />,
        ],
      },
    ],
    [handleOpenTrashLote, handleOpenDetails]
  );

  return (
    <Box sx={{ flexGrow: 1 }}>
      <Table
        columns={columns}
        rows={lotes}
        searchName="Procurar Lotes"
        url="/nursery/create-lote"
      />
      <FormDialog
        onClose={handleClose}
        open={open}
        title={"Descartar Lote " + lote?.name}
      >
        <TrashLoteForm selectedLote={lote}></TrashLoteForm>
      </FormDialog>
    </Box>
  );
}

export const getServerSideProps = withSSRAuth(async (ctx) => {
  return {
    props: {},
  };
});
