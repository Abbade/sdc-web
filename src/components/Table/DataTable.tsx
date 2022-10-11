import * as React from 'react';
import { DataGrid, GridColDef, GridValueGetterParams } from '@mui/x-data-grid';

let pageSize = 10

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
        pageSize={5}
        rowsPerPageOptions={[5,10,20]}
        //checkboxSelection
      />
    </div>
  );
}
