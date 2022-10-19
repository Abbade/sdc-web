import * as React from 'react';
import { DataGrid, GridCallbackDetails, GridColDef, GridValueGetterParams } from '@mui/x-data-grid';

let pageSize = 10

export interface DataTableInterface {
  columns: GridColDef[];
  rows: any[];
  rowCount: number;
  page: number;
  pageSize: number;
  onPageSizeChange?: (pageSize: number, details: GridCallbackDetails) => void;
  onPageChange : (page: number, details: GridCallbackDetails) => void;
}

export default function DataTable({columns, rows, onPageChange, pageSize, page, onPageSizeChange, rowCount} : DataTableInterface) {


  return (
    <div style={{ height: 'calc(100vh - 200px)', width: '100%' }}>
      <DataGrid
        rows={rows}
        columns={columns}
        onPageChange={onPageChange}
        page={page}
        pageSize={pageSize}
        rowCount={rowCount}
        onPageSizeChange={onPageSizeChange}
        paginationMode="server"
        rowsPerPageOptions={[10,20,40]}
        //checkboxSelection
      />
    </div>
  );
}
