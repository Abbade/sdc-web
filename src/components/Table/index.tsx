import * as React from "react";
import { styled } from "@mui/material/styles";
import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import Grid from "@mui/material/Grid";
import DataTable, { DataTableInterface } from "./DataTable";
import TextField from "@mui/material/TextField";
import { Button, Typography } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import { GridColDef } from "@mui/x-data-grid";
import Modal from '@mui/material/Modal';
import Link from "../Link";

export interface TableIndexInterface {
    columns: GridColDef[];
    rows: any[];
    searchName: string;
    url: string;
  }

export default function Table({ columns, rows, searchName, url} : TableIndexInterface) {
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
          <Grid item xs={3}>
            <TextField
              id="standard-basic"
              label={searchName}
              variant="standard"
              fullWidth
            />
          </Grid>
          <Grid item xs={2} textAlign="end">
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
        <DataTable columns={columns} rows={rows} />
      </Paper>
    </Box>
  );
}
