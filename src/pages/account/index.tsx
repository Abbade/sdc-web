import EditIcon from '@mui/icons-material/Edit';
import Box from "@mui/material/Box";
import { GridActionsCellItem, GridCallbackDetails, GridColumns } from "@mui/x-data-grid";
import Router from "next/router";
import { useCallback, useEffect, useMemo, useState } from "react";
import GeneralConfigTab from '../../components/GeneralConfigsTab';
import Table from "../../components/Table";
import { api } from "../../services/apiClient";
import { withSSRAuth } from "../../utils/withSSRAuth";

interface Users{
  id: number;
  name: string;
  email: string;
}

export default function AccountIndex() {
  const [itens, setItens] = useState([] as Users[]);

  const [fastSearch, setFastSearch] = useState("");
  const [pageSize, setPageSize] = useState(10);
  const [page, setPage] = useState(0);
  const [rowCount, setRowCount] = useState(0);

  useEffect(() => {
    const get = async (name: string, page: number, pageSize: number) => {
      var response = await api.get("/user", {
        params: {
          name: name,
          page: page,
          limit: pageSize,
        },
      });
      setItens(response.data.itens);
      setRowCount(response.data.total);
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
    (item: Users) => () => {
      Router.push('/account/create?id=' + item.id)
    },
    []
  );

  const columns = useMemo<GridColumns<Users>>(
    () => [
      { field: "id", headerName: "ID", width: 70 },
      { field: "name", headerName: "Nome", width: 130 },
      { field: "email", headerName: "E-mail", width: 130 },
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
      <GeneralConfigTab index={1} />
      <Table
        columns={columns}
        rows={itens}
        onFastSearchChange={onFastSearchChange}
        onPageChange={onPageChange}
        onPageSizeChange={onPageSizeChange}
        page={page}
        pageSize={pageSize}
        rowCount={rowCount}
        searchName="Procurar Usuário"
        url="/account/create"
      />
    </Box>
  );
}

export const getServerSideProps = withSSRAuth(async (ctx) => {
  return {
    props: {},
  };
}, {
  permissions: ['user.list'],
});
