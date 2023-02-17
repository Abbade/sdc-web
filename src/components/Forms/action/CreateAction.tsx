import { yupResolver } from "@hookform/resolvers/yup";
import { Button, IconButton } from "@mui/material";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";
import { useContext, useEffect, useState } from "react";
import { FieldError, FieldValues, SubmitHandler, useForm, UseFormWatch } from "react-hook-form";
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
import ActionTypeInput, { ActionTypeInputProps } from "./ActionTypeInput";
import Accordion from "@mui/material/Accordion";
import AccordionDetails from "@mui/material/AccordionDetails";
import AccordionSummary from "@mui/material/AccordionSummary";
import Typography from "@mui/material/Typography";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";

export type ICreateAction = {
  actionTypeId?: number;
  userAttributionId?: number;
  plants?: ActionItem[];
  propagations?: ActionItem[];
  crops?: ActionItem[];
  recipientId?: number;
  stageId?: number;
  trashReasonId?: number;
  scheduledDate?: Date;
};
export type ActionItem = {
  id: number;
};

type ItemType = {
  id: number;
  name: string;
};

interface ActionTypeValidationProps {
  success: boolean;
  msg: string;
}

export interface CreateActionInterface extends ActionTypeInputProps {
  onClose?: (action?: ICreateAction) => void;
  
  chosen: number;
  watch: UseFormWatch<FieldValues>;
  handleChosen: (chosen: number) => void;
}

const createObjFormSchema = yup.object().shape({
  //userAttributionId: yup.number().required("Usuário é obrigatório"),
  actionTypeId: yup.number().required("Tipo da ação é obrigatório"),
  recipientId: yup.number(),
  trashReasonId: yup.number(),
  stageId: yup.number(),
});

export default function CreateAction({
  onClose,
  chosen,
  index,
  handleChosen,
  control,
  errors,
  resetField,
  setError,
  setValue,
  watch
}: CreateActionInterface) {
  const { setAlert, setOpenLoading, showAlert } = useContext(AlertContext);
  const [actionsTypes, setActionsTypes] = useState<ItemType[]>([]);

  const [selectedPlants, setSelectedPlants] = useState([] as number[]);

  const onCheckboxSelection = (selecteds : number[]) => {
    setValue('actions[' + index + '].plants', selecteds, { shouldValidate: true })
  }

  useEffect(() => {
    const getActionType = async () => {
      setOpenLoading(true);
      const types = await api.get("/actionsTypes");
      setActionsTypes(types.data.itens);
      setOpenLoading(false);
    };

    getActionType();
  }, [setOpenLoading]);
  
  return (
    <Accordion
      expanded={chosen === index}
      disableGutters
      onChange={() => {
        handleChosen(index);
      }}
    >
      <AccordionSummary
        expandIcon={<ExpandMoreIcon />}
        
        aria-controls="panel1bh-content"
        id="panel1bh-header"
      >
        <Grid container spacing={2}>
          <Grid item xs={12} sm={4}>
            <BasicSelect
              control={control}
              label={"Tipo Ação"}
              name={'actions[' + index + '].' + "actionTypeId"}
              error={errors.actionTypeId as FieldError}
              values={actionsTypes}
            />
          </Grid>
          <Grid item xs={12} sm={3}>
            <ActionTypeInput
              control={control}
              errors={errors}
              actionTypeId={watch('actions[' + index + '].' + "actionTypeId")}
              //actionTypeId={1}
              setError={setError}
              setValue={setValue}
              index={index}
              resetField={resetField}
            />
          </Grid>
        </Grid>
      </AccordionSummary>
      <AccordionDetails>
        <Grid item xs={12}>
          <PlantProvider>
            <PlantsTableAction
              onCheckboxSelect={onCheckboxSelection}
              selectedPlants={selectedPlants}
              setSelectedPlants={setSelectedPlants}
            ></PlantsTableAction>
          </PlantProvider>
        </Grid>
      </AccordionDetails>
    </Accordion>
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
