import {
  DataGrid,
  GridCallbackDetails,
  GridColDef,
  GridSelectionModel,
} from "@mui/x-data-grid";
import LinearProgress from "@mui/material/LinearProgress";

let pageSize = 10;

export interface DataTableInterface {
  columns: GridColDef[];
  rows: any[];
  rowCount: number;
  page: number;
  pageSize: number;
  onPageSizeChange?: (pageSize: number, details: GridCallbackDetails) => void;
  onPageChange: (page: number, details: GridCallbackDetails) => void;
  onCheckboxSelection?: (
    selectionModel: GridSelectionModel,
    details: GridCallbackDetails<any>
  ) => void;
  loading?: boolean;
  useCheckBox: boolean;
  height?: string;
}

export default function DataTable({
  columns,
  rows,
  onPageChange,
  page,
  onPageSizeChange,
  onCheckboxSelection,
  rowCount,
  pageSize,
  loading,
  useCheckBox,
  height
}: DataTableInterface) {
  const heightStr = height != null ? height : "calc(100vh - 300px)";
  return (
    <div style={{   height: heightStr, width: "100%" }}>
      <DataGrid
        rows={rows}
        columns={columns}
        onPageChange={onPageChange}
        page={page}
        rowCount={rowCount}
        onPageSizeChange={onPageSizeChange}
        paginationMode="server"
        rowsPerPageOptions={[200, 100, 50, 10]}
        pageSize={pageSize}
        onSelectionModelChange={onCheckboxSelection}
        checkboxSelection={useCheckBox}
        disableSelectionOnClick
        components={{
          LoadingOverlay: LinearProgress,
        }}
        loading={loading}
      />
    </div>
  );
}
