import * as React from "react";
import { styled, useTheme } from "@mui/material/styles";
import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import Grid from "@mui/material/Grid";
import DataTable, { DataTableInterface } from "./DataTable";
import TextField from "@mui/material/TextField";
import { Badge, Button, ButtonGroup, Typography, useMediaQuery } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import {
  GridCallbackDetails,
  GridColDef,
  GridSelectionModel,
} from "@mui/x-data-grid";
import Modal from "@mui/material/Modal";
import Link from "../Link";
import IconButton from "@mui/material/IconButton";
import SplitButton from "../SplitButton";
import FilterListIcon from '@mui/icons-material/FilterList';

export interface TableIndexInterface {
  columns: GridColDef[];
  rows: any[];
  searchName: string;
  url?: string;
  rowCount: number;
  page: number;
  pageSize: number;
  onPageSizeChange?: (pageSize: number, details: GridCallbackDetails) => void;
  onPageChange: (page: number, details: GridCallbackDetails) => void;
  onCheckboxSelection?: (
    selectionModel: GridSelectionModel,
    details: GridCallbackDetails<any>
  ) => void;
  onFastSearchChange: (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => void;
  optionsImport?: any;
  onAdd?: () => void;
  onFilter?: () => void;
  totalFilter?: number;
  loading?: boolean;
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
  pageSize,
  optionsImport,
  onAdd,
  onFilter,
  totalFilter,
  loading
}: TableIndexInterface) {
  const theme = useTheme();
  const isSmallOrLess = useMediaQuery(theme.breakpoints.up("sm"));

  return (
    <Box sx={{ flexGrow: 1 }}>
      <Paper elevation={1} sx={{ p: 2 }}>
        <Grid
          container
          direction="row"
          justifyContent="space-between"
          alignItems="flex-end"
          gap={2}
          pb={3}
        >
          <Grid item sm={6} xs={6}>
            <TextField
              id="standard-basic"
              label={searchName}
              variant="standard"
              onChange={(event) => onFastSearchChange(event)}
              fullWidth
            />
          </Grid>

          <Grid item sm={6} md={4} xs={4} textAlign="end" gap={1}>
            <Grid container          direction="row" justifyContent="flex-end"    gap={1}>
            {isSmallOrLess ? (
              <>
                {onFilter !== undefined && (
                    <Grid item xs={2} textAlign={"end"}>
                     <IconButton  aria-label="filter" onClick={onFilter}>
                     <Badge badgeContent={totalFilter} color="warning">
                       <FilterListIcon />
                     </Badge>
                   </IconButton>
                   </Grid>
                )}
                 <Grid item xs={3} textAlign={"end"}>
                <SplitButton sx={{ ml: 1 }} optionsImport={optionsImport}></SplitButton>
                </Grid>
          
                {onAdd !== undefined && (
                  <Button
                    sx={{ ml: 1 }}
                    variant="contained"
                    disableElevation
                    onClick={onAdd}
                    startIcon={<AddIcon />}
                  >
                    Adicionar
                  </Button>
                )}
              </>
            ) : (
              <>
                {onFilter !== undefined && (
                     <IconButton aria-label="filter" onClick={onFilter}>
                     <Badge badgeContent={totalFilter}  max={99} color="warning">
                       <FilterListIcon />
                     </Badge>
                   </IconButton>
                )}
                {onAdd !== undefined && (
                  <IconButton
                    color="primary"
                    aria-label="upload picture"
                    component="label"
                    onClick={onAdd}
                  >
                    <AddIcon />
                  </IconButton>
                )}
              </>
            )}
            </Grid>

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
          loading={loading}
        />
      </Paper>
    </Box>
  );
}
