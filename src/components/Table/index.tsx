import AddIcon from "@mui/icons-material/Add";
import FilterListIcon from "@mui/icons-material/FilterList";
import { Badge, Button, useMediaQuery } from "@mui/material";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import IconButton from "@mui/material/IconButton";
import Paper from "@mui/material/Paper";
import { useTheme } from "@mui/material/styles";
import TextField from "@mui/material/TextField";
import {
  DataGridProps,
  GridCallbackDetails,
  GridColDef,
  GridSelectionModel,
} from "@mui/x-data-grid";
import * as React from "react";
import SplitButton, {
  IOptionsImport,
  OptionsImportProps,
} from "../SplitButton";
import DataTable from "./DataTable";

export type TableIndexInterface =  DataGridProps &  {
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
  optionsImport?: IOptionsImport[];
  onAdd?: () => void;
  onFilter?: () => void;
  totalFilter?: number;
  loading?: boolean;
  onOpenSplitButton?: (index: number) => void;
  selection?: boolean;
  height?: string;
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
  loading,
  onOpenSplitButton,
  selection,
  height,
  ...rest
}: TableIndexInterface) {
  const theme = useTheme();
  const isSmallOrLess = useMediaQuery(theme.breakpoints.up("md"));

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

          <Grid item xs={5} textAlign="end" gap={1}>
            <Grid container direction="row" justifyContent="flex-end" gap={1}>
              {isSmallOrLess ? (
                <>
                  {onFilter !== undefined && (
                    <Grid item xs={4} xl={2} textAlign={"end"}>
                      <Badge badgeContent={totalFilter} color="warning">
                        <Button
                          disableElevation
                          variant="contained"
                          aria-label="filter"
                          onClick={onFilter}
                          startIcon={<FilterListIcon />}
                        >
                          Filtro
                        </Button>
                      </Badge>
                    </Grid>
                  )}
                  {
                    optionsImport !== undefined && (
                      <Grid item xs={3} md={3} lg={3} xl={2}  textAlign={"end"}>
                      <SplitButton onOpenSplitButton={onOpenSplitButton} optionsImport={optionsImport}></SplitButton>
                    </Grid>
                    )
                  }
              

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
                      <Badge
                        badgeContent={totalFilter}
                        max={99}
                        color="warning"
                      >
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

                  <SplitButton onOpenSplitButton={onOpenSplitButton} optionsImport={optionsImport}></SplitButton>
                </>
              )}
            </Grid>
          </Grid>
        </Grid>
        <DataTable
          {...rest}
          columns={columns}
          rows={rows}
          onPageChange={onPageChange}
          onPageSizeChange={onPageSizeChange}
          onCheckboxSelection={onCheckboxSelection}
          page={page}
          pageSize={pageSize}
          rowCount={rowCount}
          loading={loading}
          useCheckBox={optionsImport != undefined || selection === true}
          height={height}
        />
      </Paper>
    </Box>
  );
}
