import Box from "@mui/material/Box";
import { GridCallbackDetails, GridColumns, GridSelectionModel } from "@mui/x-data-grid";
import { useEffect, useMemo, useState } from "react";
import { LoteInterface } from "../../interfaces/LoteInterface";
import { api } from "../../services/apiClient";
import { withSSRAuth } from "../../utils/withSSRAuth";
import Table from "../Table";
import { PlantsTableInterface } from "./PlantsTableAction";

const InitialLoteDetailsProps = {
  id: 0,
  name: "",
} as LoteInterface;

export default function ActionNurseryTable({selectedPlants, setSelectedPlants, onCheckboxSelect} : PlantsTableInterface) {
  const [lotes, setLotes] = useState([] as LoteInterface[]);

  const [fastSearch, setFastSearch] = useState("");
  const [pageSize, setPageSize] = useState(10);
  const [page, setPage] = useState(0);
  const [rowCount, setRowCount] = useState(1);

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

  const onCheckboxSelection = async (
    ids: GridSelectionModel,
    details: GridCallbackDetails<any>
  ) => {
    let idsObj = ids.map((id) => id as number );
    onCheckboxSelect(idsObj)

    setSelectedPlants(idsObj);
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
        pageSize={pageSize}
        selection={true}
        searchName="Procurar Lotes"
        onCheckboxSelection={onCheckboxSelection}
        // url="/nursery/create-lote"
      />
    </Box>
  );
}

export const getServerSideProps = withSSRAuth(async (ctx) => {
  return {
    props: {},
  };
});
