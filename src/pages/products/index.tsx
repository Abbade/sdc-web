import EditIcon from '@mui/icons-material/Edit';
import Box from "@mui/material/Box";
import { GridActionsCellItem, GridCallbackDetails, GridColumns } from "@mui/x-data-grid";
import { useCallback, useEffect, useMemo, useState } from "react";
import FormDialog from '../../components/Dialogs/Dialog';
import CreatePropagationTypeForm from '../../components/Forms/params/CreatePropagationTypeForm';
import ProductForm from '../../components/Forms/stock/ProductForm';
import Table from "../../components/Table";
import { ProductInterface } from '../../interfaces/ProductInterface';
import { api } from "../../services/apiClient";
import { withSSRAuth } from "../../utils/withSSRAuth";


export default function Products() {
  const [itens, setItens] = useState([] as ProductInterface[]);

  const [fastSearch, setFastSearch] = useState("");
  const [pageSize, setPageSize] = useState(10);
  const [page, setPage] = useState(0);
  const [rowCount, setRowCount] = useState(0);

  const [idItem, setIdItem] = useState(0);
  const [openForm, setOpenForm] = useState(false);

  const get = async (name: string, page: number, pageSize: number) => {
    var response = await api.get("/products", {
      params: {
        name: name,
        page: page,
        limit: pageSize,
      },
    });
    if(response != null && response.data != null){
      setItens(response.data.itens);
      setRowCount(response.data.total);
      console.log(pageSize);
    }

  };

  useEffect(() => {
    
    get(fastSearch, page + 1, pageSize);
  }, [pageSize, page, fastSearch]);

  const onPageSizeChange = async (pageSize: number,details: GridCallbackDetails) => {
    setPageSize(pageSize);
  };

  const onPageChange = async (page: number, details: GridCallbackDetails) => {
    setPage(page);
  };

  const onFastSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setFastSearch(event.target.value);
  };

  const handleOpenDetails = useCallback(
    (item: ProductInterface) => () => {
      setIdItem(item.id);
      setOpenForm(true);
    },
    []
  );

  const onAdd = () => {
    setIdItem(0);
    setOpenForm(true);
    
  }
  const onClose = (refresh: any) => {
    if(refresh){
      get(fastSearch, page + 1, pageSize);
    }
    setOpenForm(false);
  }

  const columns = useMemo<GridColumns<ProductInterface>>(
    () => [
      { field: "id", headerName: "ID", width: 70 },
      { field: "skuCode", headerName: "Código", width: 100 },
      { field: "name", headerName: "Nome", width: 200 },
      { field: "value", headerName: "Valor", width: 100 },
      { field: "amount", headerName: "Qtd", width: 70 },  
      {
        field: "actions",
        type: "actions",
        width: 80,
        getActions: (params) => [
          <GridActionsCellItem
            key="detail"
            icon={<EditIcon />}
            label="Editar"
            onClick={handleOpenDetails(params.row)}
          />
        ],
      },
    ],
    [handleOpenDetails]
  );

  return (
    <Box sx={{ flexGrow: 1 }}>
      <Table
        columns={columns}
        rows={itens}
        onFastSearchChange={onFastSearchChange}
        onPageChange={onPageChange}
        onPageSizeChange={onPageSizeChange}
        page={page}
        pageSize={pageSize}
        rowCount={rowCount}
        searchName="Procurar Produto"
        onAdd={onAdd}
      />
      <FormDialog scroll='body' size='xl' onClose={onClose} open={openForm} title='Produto'
      >
        <ProductForm id={idItem} onClose={onClose} />
      </FormDialog>
    </Box>
  );
}

export const getServerSideProps = withSSRAuth(async (ctx) => {
  return {
    props: {},
  };
},
{
  permissions: ["parameter.list"],
});
