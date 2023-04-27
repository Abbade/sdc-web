import { yupResolver } from "@hookform/resolvers/yup";
import { Button } from "@mui/material";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";
import { useRouter } from "next/router";
import { useContext, useEffect, useState } from "react";
import { FieldError, SubmitHandler, useForm } from "react-hook-form";
import * as yup from "yup";
import { AlertContext } from "../../../contexts/AlertContext";
import {
  ProductChildInterface,
  ProductType,
  VariableType,
  VariableTypeValue,
} from "../../../interfaces/ProductInterface";
import { withSSRAuth } from "../../../utils/withSSRAuth";
import FormDialog from "../../Dialogs/Dialog";
import BasicSelect from "../../Inputs/BasicSelect";
import BasicTextField from "../../Inputs/BasicTextField";
import VariationTypeForm from "./VariationTypeForm";
import { api } from "../../../services/apiClient";
import VariationValueForm from "./VariationValueForm";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemAvatar from "@mui/material/ListItemAvatar";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import DeleteIcon from "@mui/icons-material/Delete";
import FolderIcon from "@mui/icons-material/Folder";
import IconButton from "@mui/material/IconButton";
import Avatar from "@mui/material/Avatar";

type VariationsFormProps = {
  variablesDatas?: ProductType[];
  onAddVariable: (product: ProductType) => void;
  onRemoveVariable: (index: number) => void;
  productName: string;
  unitOfMeasureId: number | null | undefined;
};

const createObjFormSchema = yup.object().shape({
  id: yup.number().nullable(),
  name: yup.string().nullable(), // fazer na mao o produto variavel
  unitOfMeasureId: yup.number().nullable(), // fazer na mao o produto variavel
  barCode: yup.string().required("Código de Barras é obrigatório"),
  skuCode: yup.string().nullable(),
  value: yup.number().required("Valor é obrigatório"), // fazer na mao o produto variavel
  active: yup.boolean().nullable(), // fazer na mao o produto variavel
  variableTypeId: yup.string().required("Tipo de Variedade é obrigatório"),
  variableValueTypeId: yup
    .string()
    .required("Valor da variedade é obrigatório"),
  amount: yup.number().required("Qtd é obrigatório"),
});
export default function VariationsForm({
  variablesDatas,
  onAddVariable,
  onRemoveVariable,
}: VariationsFormProps) {
  const router = useRouter();

  const {
    handleSubmit,
    control,
    setValue,
    watch,
    reset,
    formState: { errors, isSubmitting },
  } = useForm({ resolver: yupResolver(createObjFormSchema) });

  const { setAlert, setOpenLoading, showAlert } = useContext(AlertContext);
  const [openForm, setOpenForm] = useState(false);
  const [openTypeValueForm, setOpenTypeValueForm] = useState(false);

  const [variableTypes, setVariableTypes] = useState([] as VariableType[]);
  const [variableTypeValues, setVariableTypeValues] = useState(
    [] as VariableTypeValue[]
  );

  const variationTypeId = watch("variableTypeId");

  useEffect(() => {
    const getVariableTypes = async () => {
      var response = await api.get("/variabletypes");
      setVariableTypes(response.data.itens);
    };
    getVariableTypes();
  }, []);

  useEffect(() => {
    const getVariableValues = async (variationTypeId: any) => {
      var response = await api.get(
        `/variableTypeValues?variableTypeId=${variationTypeId}`
      );
      setVariableTypeValues(response.data.itens);
    };
    if (variationTypeId) {
      getVariableValues(variationTypeId);
    }
  }, [variationTypeId]);

  const handleItemSubmit = async (formData: ProductType) => {
    try {
      console.log(formData);
      onAddVariable(formData);
      //onAddVariable(formData);
      //setValue("name", "");
      setValue("barCode", "");
      setValue("skuCode", "");
      setValue("value", "");
      setValue("amount", "");
      reset({ variableTypeId: "" });
      reset({ variableValueTypeId: "" });
      setVariableTypeValues([]);
    } catch (error) {
      showAlert(error.response.data.message, "error");
    }
  };
  const onCloseDialog = (refresh: any) => {
    setOpenForm(false);
  };
  const onCloseTypeValueDialog = (refresh: any) => {
    const getVariableValues = async (variationTypeId: any) => {
      var response = await api.get(
        `/variableTypeValues?variableTypeId=${variationTypeId}`
      );
      setVariableTypeValues(response.data.itens);
    };
    if (variationTypeId) {
      getVariableValues(variationTypeId);
    }
    setOpenTypeValueForm(false);
  };

  const handleKeyPress = (event) => {
    if (event.key === "Enter") {
      handleSubmit(handleItemSubmit)(event);
    }
  };

  return (
    <Container>
      <Box component="div" sx={{ mt: 1 }}>
        <Grid container spacing={2}>
          <Grid item xs={12} sm={3} lg={2}>
            <BasicSelect
              label={"Tipo Variação"}
              name={"variableTypeId"}
              values={variableTypes}
              control={control}
              onAddNew={() => setOpenForm(true)}
              error={errors.variableTypeId as FieldError}
            />
          </Grid>
          <Grid item xs={12} sm={3} lg={2}>
            <BasicSelect
              label={"Valor Variação"}
              name={"variableValueTypeId"}
              values={variableTypeValues}
              control={control}
              onAddNew={() => setOpenTypeValueForm(true)}
              error={errors.variableValueTypeId as FieldError}
            />
          </Grid>
          <Grid item xs={12} sm={3} lg={2}>
            <BasicTextField
              label={"Código de Barras"}
              name={"barCode"}
              control={control}
              error={errors.barCode as FieldError}
              onKeyPress={handleKeyPress}
            />
          </Grid>
          <Grid item xs={12} sm={3} lg={2}>
            <BasicTextField
              label={"Valor"}
              name={"value"}
              control={control}
              error={errors.value as FieldError}
              onKeyPress={handleKeyPress}
            />
          </Grid>

          <Grid item xs={12} sm={3} lg={2}>
            <BasicTextField
              label={"Qtd"}
              name={"amount"}
              control={control}
              error={errors.amount as FieldError}
              onKeyPress={handleKeyPress}
            />
          </Grid>

          <Grid item sm={2}>
            <Button
              type="button"
              fullWidth
              variant="contained"
              sx={{ mt: 1 }}
              onClick={handleSubmit(handleItemSubmit)}
            >
              adicionar
            </Button>
          </Grid>
          <Grid item xs={12}>
            <List>
              {variablesDatas &&
                variablesDatas.map((variable, index) => (
                  <ListItem
                    key={`variation${index}`}
                    secondaryAction={
                      <IconButton
                        edge="end"
                        aria-label="delete"
                        onClick={() => onRemoveVariable(index)}
                      >
                        <DeleteIcon />
                      </IconButton>
                    }
                  >
                    <ListItemAvatar>
                      <Avatar>
                        <FolderIcon />
                      </Avatar>
                    </ListItemAvatar>
                    <ListItemText
                      primary={`Nome`}
                      secondary={
                        variable.name != null
                          ? variable.name
                          : `Produto#${index + 1}`
                      }
                    />
                    <ListItemText
                      primary={`Variável`}
                      secondary={
                        variableTypes.filter(
                          (x) =>
                            x.id.toString() ===
                            variable.variableTypeId.toString()
                        )[0] != null
                          ? variableTypes.filter(
                              (x) =>
                                x.id.toString() ===
                                variable.variableTypeId.toString()
                            )[0].name
                          : `Produto#${index + 1}`
                      }
                    />
       
                    <ListItemText
                      primary="Quantidade"
                      secondary={variable.amount.toString()}
                    />
                    <ListItemText
                      primary="Valor"
                      secondary={`R$ ${variable.value}`}
                    />
                  </ListItem>
                ))}
            </List>
          </Grid>
        </Grid>
        <FormDialog
          scroll="body"
          onClose={onCloseDialog}
          open={openForm}
          title="Cadastrar Tipo Variação"
        >
          <VariationTypeForm onClose={onCloseDialog} />
        </FormDialog>
        <FormDialog
          scroll="body"
          onClose={onCloseTypeValueDialog}
          open={openTypeValueForm}
          title="Cadastrar Valor do Tipo de Variação"
        >
          <VariationValueForm
            variationTypeId={variationTypeId}
            onClose={onCloseTypeValueDialog}
          />
        </FormDialog>
      </Box>
    </Container>
  );
}
export const getServerSideProps = withSSRAuth(
  async (ctx) => {
    return {
      props: {},
    };
  },
  {
    permissions: ["user.create"],
  }
);
