import Box from "@mui/material/Box";
import { useCallback, useEffect, useMemo, useState } from "react";
import DeleteIcon from "@mui/icons-material/Delete";
import ZoomInIcon from "@mui/icons-material/ZoomIn";
import { GridActionsCellItem, GridCallbackDetails, GridColumns } from "@mui/x-data-grid";
import { LoteInterface } from "../../../../interfaces/LoteInterface";
import { api } from "../../../../services/apiClient";
import { withSSRAuth } from "../../../../utils/withSSRAuth";
import FormDialog from "../../../../components/Dialogs/Dialog";
import TrashLoteForm from "../../../../components/Forms/TrashLoteForm";
import Table from "../../../../components/Table";
import Router from "next/router";

const InitialLoteDetailsProps = {
  id: 0,
  name: "",
} as LoteInterface;

export default function Nursery() {
  const [lotes, setLotes] = useState([] as LoteInterface[]);

  const [fastSearch, setFastSearch] = useState('');
  const [pageSize, setPageSize] = useState(20);
  const [page, setPage] = useState(1);
  const [rowCount, setRowCount] = useState(1);

  useEffect(() => {
    get('', page, pageSize);
  }, []);

  useEffect(() => {

    get(fastSearch, page, pageSize);
  }, [pageSize, page, fastSearch]);


  const get = async (name : string, page: number, pageSize: number) => {

    var response = await api.get("/propagation-type",  {
      params: {
        name: name,
        page: page,
        limit: pageSize
      },
    });
    setLotes(response.data.itens);
    setRowCount(response.data.total);
  };

  const onPageSizeChange = async (pageSize: number, details: GridCallbackDetails)  => {
    setPageSize(pageSize);
  };

  const onPageChange = async (page: number, details: GridCallbackDetails)  => {
    setPage(page);
  };

  const onFastSearchChange = (event : React.ChangeEvent<HTMLInputElement>) => {
    setFastSearch(event.target.value);
  };




  const columns = useMemo<GridColumns<LoteInterface>>(
    () => [
      { field: "id", headerName: "ID", width: 70 },
      { field: "name", headerName: "Código", width: 130 },
    ],
    []
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

        searchName="Procurar Tipo Propagação"
        url="/nursery/create-lote"
      />
    </Box>
  );
}

export const getServerSideProps = withSSRAuth(async (ctx) => {
  return {
    props: {},
  };
});
