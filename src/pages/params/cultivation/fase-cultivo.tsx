import Box from "@mui/material/Box";
import { GridActionsCellItem, GridCallbackDetails, GridColumns } from "@mui/x-data-grid";
import { useCallback, useEffect, useMemo, useState } from "react";
import NurseryConfigTab from "../../../components/NurseryConfigTab";
import Table from "../../../components/Table";
import {
  LoteInterface,
  FaseCultivo,
} from "../../../interfaces/LoteInterface";
import { api } from "../../../services/apiClient";
import { withSSRAuth } from "../../../utils/withSSRAuth";
import EditIcon from '@mui/icons-material/Edit';
import FormDialog from "../../../components/Dialogs/Dialog";
import CreateFaseCultivoForm from "../../../components/Forms/params/CreateFaseCultivoForm";

export default function FaseCultivoIndex() {
  const [itens, setItens] = useState([] as FaseCultivo[]);

  const [fastSearch, setFastSearch] = useState("");
  const [pageSize, setPageSize] = useState(10);
  const [page, setPage] = useState(0);
  const [rowCount, setRowCount] = useState(0);

  const [idItem, setIdItem] = useState(0);
  const [openForm, setOpenForm] = useState(false);

  const get = async (name: string, page: number, pageSize: number) => {
    var response = await api.get("/fase-cultivo", {
      params: {
        name: name,
        page: page,
        limit: pageSize,
      },
    });
    setItens(response.data.itens);
    setRowCount(response.data.total);
  };

  useEffect(() => {
    
    get(fastSearch, page + 1, pageSize);
  }, [pageSize, page, fastSearch]);

  const onPageSizeChange = async (pageSize: number,details: GridCallbackDetails) => {
    setPageSize(pageSize);
  };

  const onPageChange = async (page: number, details: GridCallbackDetails) => {
    setPage(page);
  };

  const onFastSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setFastSearch(event.target.value);
  };

  const onAdd = () => {
    setIdItem(0);
    setOpenForm(true);
    
  }
  const onClose = (refresh: any) => {
    if(refresh){
      get(fastSearch, page + 1, pageSize);
    }
    setOpenForm(false);
  }

  const handleOpenEdit = useCallback(
    (item: LoteInterface) => () => {
      setIdItem(item.id);
      setOpenForm(true);
    },
    []
  );

  const columns = useMemo<GridColumns<LoteInterface>>(
    () => [
      { field: "id", headerName: "ID", width: 70 },
      { field: "name", headerName: "Nome", width: 130 },
      { field: "ordem", headerName: "Ordem", width: 70 },
      { field: "duration", headerName: "Duração*", width: 70 },
      {
        field: "actions",
        type: "actions",
        width: 80,
        getActions: (params) => [
          <GridActionsCellItem
            key="detail"
            icon={<EditIcon />}
            label="Editar"
            onClick={handleOpenEdit(params.row)}
          />
        ],
      },
    ],
    [handleOpenEdit]
  );

  return (
    <Box sx={{ flexGrow: 1 }}>
      <NurseryConfigTab index={1} />
      <Table
        columns={columns}
        rows={itens}
        onFastSearchChange={onFastSearchChange}
        onPageChange={onPageChange}
        onPageSizeChange={onPageSizeChange}
        page={page}
        pageSize={pageSize}
        rowCount={rowCount}
        searchName="Procurar fase cultivo"
        onAdd={onAdd}
      />
      <FormDialog onClose={onClose} open={openForm} title='Fase de Cultivo'
      >
        <CreateFaseCultivoForm id={idItem} onClose={onClose} />
      </FormDialog>
    </Box>
  );
}

export const getServerSideProps = withSSRAuth(async (ctx) => {
  return {
    props: {},
  };
},
{
  permissions: ["parameter.list"],
});
