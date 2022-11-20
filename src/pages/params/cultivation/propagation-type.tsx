import EditIcon from '@mui/icons-material/Edit';
import Box from "@mui/material/Box";
import { GridActionsCellItem, GridCallbackDetails, GridColumns } from "@mui/x-data-grid";
import Router from "next/router";
import { useCallback, useEffect, useMemo, useState } from "react";
import FormDialog from '../../../components/Dialogs/Dialog';
import CreatePropagationTypeForm from '../../../components/Forms/params/CreatePropagationTypeForm';
import NurseryConfigTab from "../../../components/NurseryConfigTab";
import Table from "../../../components/Table";
import {
  PropagationType
} from "../../../interfaces/LoteInterface";
import { api } from "../../../services/apiClient";
import { withSSRAuth } from "../../../utils/withSSRAuth";


export default function PropagationTypeIndex() {
  const [itens, setItens] = useState([] as PropagationType[]);

  const [fastSearch, setFastSearch] = useState("");
  const [pageSize, setPageSize] = useState(10);
  const [page, setPage] = useState(0);
  const [rowCount, setRowCount] = useState(0);

  const [idItem, setIdItem] = useState(0);
  const [openForm, setOpenForm] = useState(false);

  const get = async (name: string, page: number, pageSize: number) => {
    var response = await api.get("/propagation-type", {
      params: {
        name: name,
        page: page,
        limit: pageSize,
      },
    });
    setItens(response.data.itens);
    setRowCount(response.data.total);
    console.log(pageSize);
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

  const handleOpenDetails = useCallback(
    (item: PropagationType) => () => {
      setIdItem(item.id);
      setOpenForm(true);
    },
    []
  );

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

  const columns = useMemo<GridColumns<PropagationType>>(
    () => [
      { field: "id", headerName: "ID", width: 70 },
      { field: "name", headerName: "Nome", width: 130 },
      {
        field: "actions",
        type: "actions",
        width: 80,
        getActions: (params) => [
          <GridActionsCellItem
            key="detail"
            icon={<EditIcon />}
            label="Editar"
            onClick={handleOpenDetails(params.row)}
          />
        ],
      },
    ],
    [handleOpenDetails]
  );

  return (
    <Box sx={{ flexGrow: 1 }}>
      <NurseryConfigTab index={0} />
      <Table
        columns={columns}
        rows={itens}
        onFastSearchChange={onFastSearchChange}
        onPageChange={onPageChange}
        onPageSizeChange={onPageSizeChange}
        page={page}
        pageSize={pageSize}
        rowCount={rowCount}
        searchName="Procurar Tipo Propagação"
        url="/params/cultivation/propagation-type/create-propagation-type"
        onAdd={onAdd}
      />
      <FormDialog onClose={onClose} open={openForm} title='Tipo de Propagação'
      >
        <CreatePropagationTypeForm id={idItem} onClose={onClose} />
      </FormDialog>
    </Box>
  );
}

export const getServerSideProps = withSSRAuth(async (ctx) => {
  return {
    props: {},
  };
});
