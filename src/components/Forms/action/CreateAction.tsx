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
import { FaseCultivo } from "../../../interfaces/LoteInterface";
import { PlantaInterface } from "../../../interfaces/PlantaInterface";
import { api } from "../../../services/apiClient";
import { withSSRAuth } from "../../../utils/withSSRAuth";
import BasicSelect from "../../Inputs/BasicSelect";
import PlantsTableAction from "../../TableModels/PlantsTableAction";
import ActionTypeInput from "./ActionTypeInput";

export type ICreateAction = {
  actionTypeId: number;
  userAttributionId?: number;
  plants?: ActionItem[];
  propagations?: ActionItem[];
  crops?: ActionItem[];
  recipientId?: number;
  stageId?: number;
  trashReasonId?: number;
  scheduledDate?: Date;
};
type ActionItem = {
  id: number;
  completed: boolean;
};

type ItemType = {
  id: number;
  name: string;
};

interface ActionTypeValidationProps {
  success: boolean;
  msg: string;
}

export interface CreateActionInterface {
  onClose?: (action?: ICreateAction) => void;
}

const createObjFormSchema = yup.object().shape({
  //userAttributionId: yup.number().required("Usuário é obrigatório"),
  actionTypeId: yup.number().required("Tipo da ação é obrigatório"),
  recipientId: yup.number(),
  trashReasonId: yup.number(),
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
    setError,
    resetField,
    formState: { errors, isSubmitting },
  } = useForm({ resolver: yupResolver(createObjFormSchema) });

  const { setAlert, setOpenLoading, showAlert } = useContext(AlertContext);
  const [actionsTypes, setActionsTypes] = useState<ItemType[]>([]);

  const [selectedPlants, setSelectedPlants] = useState([] as PlantaInterface[]);

  useEffect(() => {
    const getActionType = async () => {
      setOpenLoading(true);
      const types = await api.get("/actionsTypes");
      setActionsTypes(types.data.itens);
      setOpenLoading(false);
    };

    getActionType();
  }, [setOpenLoading]);

  const ActionTypeValidation = (action: ICreateAction): boolean => {
    const actionTypeIdNum =
      action.actionTypeId == undefined
        ? -1
        : Number.parseInt(action.actionTypeId.toString());

    let res = { success: true, msg: "" } as ActionTypeValidationProps;

    switch (actionTypeIdNum) {
      case ACTION_TYPE.TRANSPLANTE:
        if (action.recipientId == null) {
          setError("recipientId", {
            type: "custom",
            message: "Campo obrigatório",
          });
          return false;
        }

        break;
      case ACTION_TYPE.ALTERA_FASE_CULTIVO:
        if (action.stageId == null) {
          setError("stageId", { type: "custom", message: "Campo obrigatório" });
          return false;
        }
        break;
      case ACTION_TYPE.DESCARTE_PLANTA:
        if (action.trashReasonId == null) {
          setError("trashReasonId", {
            type: "custom",
            message: "Campo obrigatório",
          });
          return false;
        }
        break;
    }
    return true;
  };

  const handleLoteSubmit: SubmitHandler<ICreateAction> = async (formData) => {
    try {
      setOpenLoading(true);
   
      if (!ActionTypeValidation(formData)) {
        setOpenLoading(false);
        return;
      }
      if (selectedPlants.length <= 0) {
        showAlert("Selecione ao menos uma Planta/Muda", "error");
        setOpenLoading(false);
        return;
      }
      let plants = selectedPlants.map((plant) => {
        return { id: plant.id, completed: false } as ActionItem;
      });
      formData.plants = plants;
      console.log("oi");
      console.log(formData);
      setOpenLoading(false);
      showAlert("Ação Salva com sucesso.", "success");
      onClose(formData)
      // onClose(true);
    } catch (error) {
      setOpenLoading(false);

      //showAlert(error.response.data.message, "error");
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
            <ActionTypeInput
              control={control}
              errors={errors}
              actionTypeId={watch("actionTypeId")}
              setError={setError}
              setValue={setValue}
              resetField={resetField}
            />
          </Grid>
          <Grid item xs={12}>
            <PlantProvider>
              <PlantsTableAction
                selectedPlants={selectedPlants}
                setSelectedPlants={setSelectedPlants}
              ></PlantsTableAction>
            </PlantProvider>
          </Grid>
        </Grid>

        <Button
          type="submit"
          fullWidth
          variant="contained"
          sx={{ mt: 3, mb: 2 }}
        >
          Adicionar
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
