import { Button } from "@mui/material";
import Box from "@mui/material/Box";
import { GridCallbackDetails, GridColDef } from "@mui/x-data-grid";
import { format } from "date-fns";
import Router from "next/router";
import { useEffect, useState } from "react";
import { PlantaInterface } from "../../interfaces/PlantaInterface";
import { api } from "../../services/apiClient";
import Table from "../Table";

export default function CroppedPlantsTable({ id }) {
  const [lotes, setLotes] = useState([] as PlantaInterface[]);

  const [fastSearch, setFastSearch] = useState("");
  const [pageSize, setPageSize] = useState(10);
  const [page, setPage] = useState(0);
  const [rowCount, setRowCount] = useState(0);

  useEffect(() => {
    console.log("trash render")
    const get = async (name: string, page: number, pageSize: number) => {
      var response = await api.get("/crops", id ? { params: { id: id } } : {});
      console.log(response)
      console.log(id)
      setLotes(response.data?.itens[0]?.plantas);
      setRowCount(response.data?.total);
    };
    if (id) {
      get(fastSearch, page, pageSize);
    }
  }, [pageSize, page, fastSearch, id]);

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
  };

  return (
    <Box sx={{ flexGrow: 1 }}>
      <Table
      pageSize={pageSize}
        columns={columns}
        rows={lotes}
        searchName={"Atividades"}
        onPageChange={onPageChange}
        onPageSizeChange={onPageSizeChange}
        onFastSearchChange={onFastSearchChange}
        page={page}
        rowCount={rowCount}
        

      />
    </Box>
  );
}


const columns: GridColDef[] = [
  { field: "name", headerName: "Código", width: 130 },
  { field: "flowersWetMass", headerName: "Massa Úmida", width: 130 },
  { field: "flowersDriedMass", headerName: "Massa Seca", width: 130 },
  

];
