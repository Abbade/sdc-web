import { yupResolver } from "@hookform/resolvers/yup";
import { Box, Button, Grid } from "@mui/material";
import { useContext, useEffect, useState } from "react";
import { FieldError, SubmitHandler, useForm } from "react-hook-form";
import * as yup from "yup";
import { AlertContext } from "../../../contexts/AlertContext";
import { EditInterface } from "../../../interfaces/EditInterface";
import {
  ProductType,
  UnitOfMeasure,
  VariableType,
  VariableTypeValue,
} from "../../../interfaces/ProductInterface";
import { api } from "../../../services/apiClient";
import BasicCheckbox from "../../Inputs/BasicCheckbox";
import BasicSelect from "../../Inputs/BasicSelect";
import BasicTextField from "../../Inputs/BasicTextField";
import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import Typography from "@mui/material/Typography";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import VariationsForm from "./VariationsForm";
import FormDialog from "../../Dialogs/Dialog";

const createObjFormSchema = yup.object().shape({
  id: yup.number(),
  name: yup.string().required("Nome é obrigatório"),
  active: yup.boolean().nullable(),
  value:  yup.number().nullable(),
  skuCode: yup.string().required("Código é obrigatório"),
  barCode: yup.string().nullable(),
  obs: yup.string().nullable(),
  isVariable: yup.boolean().nullable(),
  parentId: yup.number().nullable(),
  variableTypeId: yup.number().nullable(),
  variableValueTypeId: yup.number().nullable(),
  unitOfMeasureId: yup.number().required("Unidade de medida é obrigatória"),
  productCategoryId: yup.number().nullable(),
  height: yup.number().nullable(),
  width: yup.number().nullable(),
  depth: yup.number().nullable(),
  volumes: yup.number().nullable(),
  netWeight: yup.number().nullable(),
  grossWeight: yup.number().nullable(),
  amount: yup.number().nullable(),
  minAmount: yup.mixed().nullable(),
  maxAmount: yup.mixed().nullable(),
});

export default function ProductForm({ id, onClose }: EditInterface) {
  const {
    handleSubmit,
    control,
    setValue,
    watch,
    getValues,
    setError,
    clearErrors,
    formState: { errors, isSubmitting },
  } = useForm({ resolver: yupResolver(createObjFormSchema) });

  const { showAlert, setOpenLoading } = useContext(AlertContext);

  const [unitsOfMeasures, setUnitsOfMeasures] = useState([] as UnitOfMeasure[]);
  const childrens = watch("children");
  const isVariable = watch("isVariable");

  useEffect(() => {
    const geUnitsOfMeasures = async () => {
      var response = await api.get("/unitofmeasures");
      setUnitsOfMeasures(response.data.itens);
    };

    geUnitsOfMeasures();
  }, []);

  useEffect(() => {
    if(isVariable){
      let teste = getValues('value');
      console.log(teste ?? '');
      clearErrors('value');
      clearErrors('barCode');
      clearErrors('amount');
      
    } 
    else if(isVariable != null) {
      let teste = getValues('value');
      console.log(teste);
      setError('value', { type: 'required' });
      setError('barCode', { type: 'required' });
      setError('amount', { type: 'required' });
    }
  }, [isVariable, setError, getValues, clearErrors])

  useEffect(() => {
    const get = async (id) => {
      if (id > 0) {
        setOpenLoading(true);
        const item = await api.get(`products/${id}`);
        setValue("name", item.data.name);
        setValue("id", item.data.id);
        setOpenLoading(false);
   
      }
    };
    get(id);
  }, [id, setValue, setOpenLoading]);

  const handleLoteSubmit: SubmitHandler<ProductType> = async (formData) => {
    try {
      console.log(formData);
      setOpenLoading(true);
      if (formData.id > 0) {
        const item = await api.put("products", formData);
        showAlert("Produto editado com sucesso.", "success");
      } else {
        const item = await api.post("products", formData);
        showAlert("Produto cadastrado com sucesso.", "success");
      }
      setOpenLoading(false);
      onClose(true);
    } catch (error) {
      const errorOficial = error as Error;
      setOpenLoading(false);
      showAlert(errorOficial.message, "error");
    }
  };

  const onAddChild = (product: ProductType) => {
    console.log("adiciounou no pai");
    console.log(product);
    const items = getValues('children') || [];
    setValue('children', [...items, product]);
  };
  const onRemoveChild = (index : number) => {
    const items = getValues('children') || [];
    items.splice(index, 1);
    setValue('children', [...items]);
  };

  return (
    <Box
      component="form"
      noValidate
      onSubmit={handleSubmit(handleLoteSubmit)}
      sx={{ mt: 3 }}
    >
      <Grid container spacing={2}>
        <Grid container item spacing={2}>
          <Grid item xs={12} sm={6}>
            <BasicTextField
              label={"Nome *"}
              name={"name"}
              control={control}
              error={errors.name as FieldError}
            />
          </Grid>
          <Grid item xs={12} sm={3} lg={2}>
            <BasicTextField
              label={"Código (SKU) *"}
              name={"skuCode"}
              control={control}
              error={errors.skuCode as FieldError}
            />
          </Grid>

          <Grid item xs={12} sm={3} lg={2} xl={1}>
            <BasicTextField
              label={"Valor *"}
              name={"value"}
              control={control}
              error={errors.value as FieldError}
            />
          </Grid>
        </Grid>
        <Grid container item spacing={2}>
          <Grid item xs={12} sm={12} lg={3} xl={2}>
            <BasicCheckbox
              label={"Produto variável"}
              name={"isVariable"}
              control={control}
              error={errors.isVariable as FieldError}
            />
          </Grid>
        </Grid>
        <Grid container item spacing={2}>
          <Grid item xs={12} sm={4} lg={3} xl={2}>
            <BasicSelect
              label={"Unidade de Medida *"}
              name={"unitOfMeasureId"}
              values={unitsOfMeasures}
              control={control}
              error={errors.unitOfMeasureId as FieldError}
            />
          </Grid>
          {!isVariable && (
            <Grid item xs={12} sm={4} lg={3} xl={2}>
              <BasicTextField
                label={"Código de barras (EAN) *"}
                name={"barCode"}
                control={control}
                error={errors.barCode as FieldError}
              />
            </Grid>
          )}
        </Grid>
        <Grid container item spacing={2}>
          <Grid item xs={12} sm={12}>
            <BasicTextField
              label={"Observação"}
              name={"obs"}
              control={control}
              multiline
              minRows={5}
              error={errors.obs as FieldError}
            />
          </Grid>
        </Grid>

        <Grid container item spacing={2}>
          <Grid item xs={12} sm={12}>
            {!isVariable ? (
              <>
                <Accordion>
                  <AccordionSummary
                    expandIcon={<ExpandMoreIcon />}
                    aria-controls="stock-content"
                    id="stock-header"
                  >
                    <Typography>Estoque *</Typography>
                  </AccordionSummary>
                  <AccordionDetails>
                    <Grid container spacing={2}>
                      <Grid container item spacing={2}>
                        <Grid item xs={12} sm={3} lg={2}>
                          <BasicTextField
                            label={"Quantidade *"}
                            name={"amount"}
                            control={control}
                            error={errors.amount as FieldError}
                          />
                        </Grid>
                      </Grid>
                      <Grid container item spacing={2}>
                        <Grid item xs={12} sm={3} lg={2}>
                          <BasicTextField
                            label={"Estoque Mínimo"}
                            name={"minAmount"}
                            control={control}
                            error={errors.minAmount as FieldError}
                          />
                        </Grid>
                        <Grid item xs={12} sm={3} lg={2}>
                          <BasicTextField
                            label={"Estoque Máximo"}
                            name={"maxAmount"}
                            control={control}
                            error={errors.maxAmount as FieldError}
                          />
                        </Grid>
                        <Grid item xs={12} sm={4} lg={3} xl={2}>
                          <BasicSelect
                            label={"Categoria"}
                            name={"productCategoryId"}
                            values={[]}
                            control={control}
                            error={errors.productCategoryId as FieldError}
                          />
                        </Grid>
                      </Grid>
                    </Grid>
                  </AccordionDetails>
                </Accordion>
                <Accordion>
                  <AccordionSummary
                    expandIcon={<ExpandMoreIcon />}
                    aria-controls="dimensions-content"
                    id="dimensions-header"
                  >
                    <Typography>Dimensões</Typography>
                  </AccordionSummary>
                  <AccordionDetails>
                    <Typography>
                      Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                      Suspendisse malesuada lacus ex, sit amet blandit leo
                      lobortis eget.
                    </Typography>
                  </AccordionDetails>
                </Accordion>
              </>
            ) : (
              <>
                <Accordion>
                  <AccordionSummary
                    expandIcon={<ExpandMoreIcon />}
                    aria-controls="dimensions-content"
                    id="dimensions-header"
                  >
                    <Typography>Variações</Typography>
                  </AccordionSummary>
                  <AccordionDetails>
                    <VariationsForm
                      onAddVariable={onAddChild}
                      onRemoveVariable={onRemoveChild}
                      productName={watch("name")}
                      unitOfMeasureId={watch("unitOfMeasureId")}
                      variablesDatas={childrens}
                    />
                  </AccordionDetails>
                </Accordion>
              </>
            )}
          </Grid>
        </Grid>
      </Grid>

      <Button type="submit" fullWidth variant="contained" sx={{ mt: 3, mb: 2 }}>
        {id > 0 ? "Editar" : "Cadastrar"} Produto
      </Button>
    </Box>
  );
}
