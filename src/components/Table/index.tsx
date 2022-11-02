import * as React from "react";
import { styled, useTheme } from "@mui/material/styles";
import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import Grid from "@mui/material/Grid";
import DataTable, { DataTableInterface } from "./DataTable";
import TextField from "@mui/material/TextField";
import { Button, Typography, useMediaQuery } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import { GridCallbackDetails, GridColDef, GridSelectionModel } from "@mui/x-data-grid";
import Modal from "@mui/material/Modal";
import Link from "../Link";
import IconButton from '@mui/material/IconButton';

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
  onCheckboxSelection?: (selectionModel: GridSelectionModel, details: GridCallbackDetails<any>) => void;
  onFastSearchChange : (event : React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
  //onSearchChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

export default function Table({
  columns,
  rows,
  searchName,
  url,
  onPageChange,
  page,
  onPageSizeChange,
  onFastSearchChange,
  onCheckboxSelection,
  rowCount,
  pageSize
}: TableIndexInterface) {
  const theme = useTheme();
  const isSmallOrLess = 
  useMediaQuery(theme.breakpoints.up('sm'));

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
          <Grid item sm={3} xs={6}>
            <TextField
              id="standard-basic"
              label={searchName}
              variant="standard"
              onChange={(event) => onFastSearchChange(event)}
              fullWidth
            />
          </Grid>
          <Grid item sm={2} xs={2} textAlign="end">
            <Link href={url}>
            {isSmallOrLess ? (
                  <Button
                  variant="contained"
                  disableElevation
                  startIcon={<AddIcon />}
                >
                  Adicionar
                </Button>
                )
              :
              (
              <IconButton color="primary" aria-label="upload picture" component="label">
              
                      <AddIcon />
                    </IconButton>
              )}
              
            </Link>
          </Grid>
        </Grid>
        <DataTable
          columns={columns}
          rows={rows}
          onPageChange={onPageChange}
          onPageSizeChange={onPageSizeChange}
          onCheckboxSelection={onCheckboxSelection}
          page={page}
          pageSize={pageSize}
          rowCount={rowCount}

        />
      </Paper>
    </Box>
  );
}
