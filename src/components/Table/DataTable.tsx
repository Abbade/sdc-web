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

export default function DataTable({columns, rows, onPageChange, page, onPageSizeChange, rowCount, pageSize} : DataTableInterface) {


  return (
    <div style={{ height: 'calc(100vh - 300px)', width: '100%' }}>
      <DataGrid
        rows={rows}
        columns={columns}
        onPageChange={onPageChange}
        page={page}

        rowCount={rowCount}
        onPageSizeChange={onPageSizeChange}
        paginationMode="server"
        rowsPerPageOptions={[200,100, 50, 10]}
        pageSize={pageSize}

        //checkboxSelection
      />
    </div>
  );
}
