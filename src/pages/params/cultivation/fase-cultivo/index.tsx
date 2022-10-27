import Box from "@mui/material/Box";
import { GridCallbackDetails, GridColumns } from "@mui/x-data-grid";
import { useEffect, useMemo, useState } from "react";
import NurseryConfigTab from "../../../../components/NurseryConfigTab";
import Table from "../../../../components/Table";
import {
  LoteInterface,
  PropagationType,
} from "../../../../interfaces/LoteInterface";
import { api } from "../../../../services/apiClient";
import { withSSRAuth } from "../../../../utils/withSSRAuth";

export default function FaseCultivoIndex() {
  const [itens, setItens] = useState([] as PropagationType[]);

  const [fastSearch, setFastSearch] = useState("");
  const [pageSize, setPageSize] = useState(10);
  const [page, setPage] = useState(0);
  const [rowCount, setRowCount] = useState(0);

  useEffect(() => {
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

  const columns = useMemo<GridColumns<LoteInterface>>(
    () => [
      { field: "id", headerName: "ID", width: 70 },
      { field: "name", headerName: "Nome", width: 130 },
    ],
    []
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
        url="/params/cultivation/propagation-type/fase-cultivo/create"
      />
    </Box>
  );
}

export const getServerSideProps = withSSRAuth(async (ctx) => {
  return {
    props: {},
  };
});
