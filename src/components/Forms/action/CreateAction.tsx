import { yupResolver } from "@hookform/resolvers/yup";
import { Button } from "@mui/material";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";
import { useContext, useEffect, useState } from "react";
import { FieldError, SubmitHandler, useForm } from "react-hook-form";
import * as yup from "yup";
import { ACTION_TYPE } from "../../../constants/ACTION_TYPE";
import { AlertContext } from "../../../contexts/AlertContext";
import { PlantProvider } from "../../../contexts/PlantsContext";
import { api } from "../../../services/apiClient";
import { withSSRAuth } from "../../../utils/withSSRAuth";
import BasicSelect from "../../Inputs/BasicSelect";
import PlantsTableAction from "../../TableModels/PlantsTableAction";

export type ICreateAction = {
  actionTypeId: number;
  userAttributionId?: number;
  plants?: ActionItem[];
  propagations?: ActionItem[];
  crops?: ActionItem[];
  recipientId?: number;
  stageId?: number;
};
type ActionItem = {
  id: number;
  userAttributionId: number;
  scheduledDate?: Date;
};

type ItemType = {
  id: number;
  name: string;
};

export interface CreateActionInterface {
  onClose?: (action?: ICreateAction) => void;
}

const createObjFormSchema = yup.object().shape({
  //userAttributionId: yup.number().required("Usuário é obrigatório"),
  actionTypeId: yup.number().required("Tipo da ação é obrigatório"),
  recipientId: yup.number(),
  stageId: yup.number(),
});

export default function CreateAction({ onClose }: CreateActionInterface) {
  const {
    register,
    handleSubmit,
    control,
    setValue,
    watch,
    getValues,
    formState: { errors, isSubmitting },
  } = useForm({ resolver: yupResolver(createObjFormSchema) });

  const { setAlert, setOpenLoading, showAlert } = useContext(AlertContext);
  const [actionsTypes, setActionsTypes] = useState<ItemType[]>([]);
  const [recipients, setRecipients] = useState<ItemType[]>([]);
  const [plantStage, setPlantStage] = useState<ItemType[]>([]);
  const [showPlants, setShowPlants] = useState(false);

  useEffect(() => {
    const getActionType = async () => {
      setOpenLoading(true);
      const types = await api.get("/actionsTypes");
      setActionsTypes(types.data.itens);
      setOpenLoading(false);
    };
    const getRecipients = async () => {
      setOpenLoading(true);
      const types = await api.get("/recipiente");
      setRecipients(types.data.itens);
      setOpenLoading(false);
    };
    const getPlantStage = async () => {
      setOpenLoading(true);
      const types = await api.get("/fase-cultivo");
      setPlantStage(types.data.itens);
      setOpenLoading(false);
    };
    getActionType();
    const subscription = watch((value, { name, type }) => {
      console.log(value, name, type);
      if (name === "actionTypeId" && type === "change") {
        const actionTypeIdNum =
          isNaN(Number.parseInt(value.actionTypeId)) ||
          value.actionTypeId == undefined
            ? -1
            : Number.parseInt(value.actionTypeId);

        switch (actionTypeIdNum) {
          case ACTION_TYPE.TRANSPLANTE:
            getRecipients();
            break;
          case ACTION_TYPE.ALTERA_FASE_CULTIVO:
            getPlantStage();
            break;
          default:
            setRecipients([]);
            break;
        }
      }
    });
    return () => subscription.unsubscribe();
  }, [setOpenLoading, watch]);

  const ActionTypeInputs = (props) => {
    const actionType = props.actionType;
    const actionTypeIdNum =
      isNaN(Number.parseInt(actionType)) || actionType == undefined
        ? -1
        : Number.parseInt(actionType);

    switch (actionTypeIdNum) {
      case ACTION_TYPE.TRANSPLANTE:
        return (<BasicSelect
          control={control}
          label={"Recipiente"}
          name={"recipientId"}
          error={errors.recipientId as FieldError}
          values={recipients}
        />);
      case ACTION_TYPE.ALTERA_FASE_CULTIVO:
        return (<BasicSelect
          control={control}
          label={"Fase de Cultivo"}
          name={"stageId"}
          error={errors.stageId as FieldError}
          values={plantStage}
        />);
      default:
        return (<></>);
    }
  };

  const handleLoteSubmit: SubmitHandler<ICreateAction> = async (formData) => {
    try {
      console.log("oi");
      console.log(formData);
      setOpenLoading(true);
      //  const item = await api.post("actiongroup", formData);
      setOpenLoading(false);
      showAlert("Ação Salva com sucesso.", "success");
      // onClose(true);
    } catch (error) {
      setOpenLoading(false);
      showAlert(error.response.data.message, "error");
    }
  };

  return (
    <Container component="main" maxWidth="xl">
      <Box
        component="form"
        noValidate
        onSubmit={handleSubmit(handleLoteSubmit)}
        sx={{ mt: 1 }}
      >
        <Grid container spacing={2}>
          <Grid item xs={12} sm={6}>
            <BasicSelect
              control={control}
              label={"Tipo Ação"}
              name={"actionTypeId"}
              error={errors.actionTypeId as FieldError}
              values={actionsTypes}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <ActionTypeInputs actionType={getValues("actionTypeId")}  />
          </Grid>
          <Grid item xs={12}>
            <PlantProvider>
              <PlantsTableAction></PlantsTableAction>
            </PlantProvider>
          </Grid>
        </Grid>

        <Button
          type="submit"
          fullWidth
          variant="contained"
          sx={{ mt: 3, mb: 2 }}
        >
          Salvar
        </Button>
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
