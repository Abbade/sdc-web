import EditIcon from '@mui/icons-material/Edit';
import Box from "@mui/material/Box";
import { GridActionsCellItem, GridCallbackDetails, GridColumns } from "@mui/x-data-grid";
import Router from "next/router";
import { useCallback, useEffect, useMemo, useState } from "react";
import NurseryConfigTab from "../../components/NurseryConfigTab";
import Table from "../../components/Table";
import {
  PropagationType
} from "../../interfaces/LoteInterface";
import { api } from "../../services/apiClient";
import { withSSRAuth } from "../../utils/withSSRAuth";
import  Typography  from "@mui/material/Typography";
import GeneralConfigTab from '../../components/GeneralConfigsTab';


export default function RolesIndex() {
  const [itens, setItens] = useState([] as PropagationType[]);

  const [fastSearch, setFastSearch] = useState("");
  const [pageSize, setPageSize] = useState(10);
  const [page, setPage] = useState(0);
  const [rowCount, setRowCount] = useState(0);

  useEffect(() => {
    const get = async (name: string, page: number, pageSize: number) => {
      var response = await api.get("/roles", {
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

  const handleOpenEdit = useCallback(
    (item: PropagationType) => () => {
      Router.push('/roles/create?id=' + item.id)
    },
    []
  );

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
            onClick={handleOpenEdit(params.row)}
          />
        ],
      },
    ],
    []
  );

  return (
    <Box sx={{ flexGrow: 1 }}>
      <GeneralConfigTab index={2} />
      <Table
        columns={columns}
        rows={itens}
        onFastSearchChange={onFastSearchChange}
        onPageChange={onPageChange}
        onPageSizeChange={onPageSizeChange}
        page={page}
        pageSize={pageSize}
        rowCount={rowCount}
        searchName="Procurar Perfil"
        url="/roles/create"
      />
    </Box>
  );
}

export const getServerSideProps = withSSRAuth(async (ctx) => {
  return {
    props: {},
  };
});
