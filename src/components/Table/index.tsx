import * as React from "react";
import { styled } from "@mui/material/styles";
import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import Grid from "@mui/material/Grid";
import DataTable, { DataTableInterface } from "./DataTable";
import TextField from "@mui/material/TextField";
import { Button, Typography } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import { GridCallbackDetails, GridColDef } from "@mui/x-data-grid";
import Modal from "@mui/material/Modal";
import Link from "../Link";

export interface TableIndexInterface {
  columns: GridColDef[];
  rows: any[];
  searchName: string;
  url: string;
  rowCount: number;
  page: number;
  pageSize: number;
  onPageSizeChange?: (pageSize: number, details: GridCallbackDetails) => void;
  onPageChange: (page: number, details: GridCallbackDetails) => void;
  //onSearchChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

export default function Table({
  columns,
  rows,
  searchName,
  url,
  onPageChange,
  pageSize,
  page,
  onPageSizeChange,
  rowCount,
}: TableIndexInterface) {
  return (
    <Box sx={{ flexGrow: 1 }}>
      <Paper elevation={0} sx={{ p: 2 }}>
        <Grid
          container
          direction="row"
          justifyContent="space-between"
          alignItems="flex-end"
          pb={3}
        >
          <Grid item sm={3} xs={12}>
            <TextField
              id="standard-basic"
              label={searchName}
              variant="standard"
              fullWidth
            />
          </Grid>
          <Grid item sm={2} xs={12} textAlign="end">
            <Link href={url}>
              <Button
                variant="contained"
                disableElevation
                startIcon={<AddIcon />}
              >
                Adicionar
              </Button>
            </Link>
          </Grid>
        </Grid>
        <DataTable
          columns={columns}
          rows={rows}
          onPageChange={onPageChange}
          page={page}
          pageSize={pageSize}
          rowCount={rowCount}

        />
      </Paper>
    </Box>
  );
}
