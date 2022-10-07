import * as React from 'react';
import { DataGrid, GridColDef, GridValueGetterParams } from '@mui/x-data-grid';



export interface DataTableInterface {
  columns: GridColDef[];
  rows: any[];
}

export default function DataTable({columns, rows} : DataTableInterface) {
  return (
    <div style={{ height: 'calc(100vh - 200px)', width: '100%' }}>
      <DataGrid
        rows={rows}
        columns={columns}
        pageSize={100}
        rowsPerPageOptions={[100]}
        checkboxSelection
      />
    </div>
  );
}
