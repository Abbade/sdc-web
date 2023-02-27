import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import Accordion from "@mui/material/Accordion";
import AccordionDetails from "@mui/material/AccordionDetails";
import AccordionSummary from "@mui/material/AccordionSummary";
import Grid from "@mui/material/Grid";
import { useContext, useEffect, useState } from "react";
import {
  FieldError,
  FieldValues,
  UseFormGetValues,
  UseFormWatch,
} from "react-hook-form";
import * as yup from "yup";
import { AlertContext } from "../../../contexts/AlertContext";
import { PlantProvider } from "../../../contexts/PlantsContext";
import { api } from "../../../services/apiClient";
import { withSSRAuth } from "../../../utils/withSSRAuth";
import BasicSelect from "../../Inputs/BasicSelect";
import Progress from "../../Progress";
import PlantsTableAction from "../../TableModels/PlantsTableAction";
import ActionTypeInput, { ActionTypeInputProps } from "./ActionTypeInput";
import TaskAltIcon from "@mui/icons-material/TaskAlt";
import IconButton from "@mui/material/IconButton";
import BasicDateTimePicker from "../../Inputs/BasicDateTimePicker";
import { UserInterface } from "../../../interfaces/UserInterface";

export type ICreateAction = {
  completed: boolean;
  userComplete?: number;
  dateCompletion?: Date;
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

export type ItemType = {
  id: number;
  name: string;
};

interface ActionTypeValidationProps {
  success: boolean;
  msg: string;
}

export interface CreateActionInterface extends ActionTypeInputProps {
  onClose?: (action?: ICreateAction) => void;
  fromAction: boolean;
  chosen: number;
  watch: UseFormWatch<FieldValues>;
  handleChosen: (chosen: number) => void;
  users?: UserInterface[];
  getValues: UseFormGetValues<FieldValues>;
  actionsTypes: ItemType[];
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
  watch,
  getValues,
  fromAction,
  users,
  actionsTypes
}: CreateActionInterface) {
  const { setAlert, setOpenLoading, showAlert } = useContext(AlertContext);


  const [selectedPlants, setSelectedPlants] = useState([] as number[]);

  const onCheckboxSelection = (selecteds: number[]) => {
    setValue("actions[" + index + "].plants", selecteds, {
      shouldValidate: true,
    });
  };



  const onCompleteAction = () => {
    console.log("CLICKOUI");
    let isCompleted = getValues("actions[" + index + "].completed");
    isCompleted = isCompleted != null ? isCompleted : false;
    console.log("actions[" + index + "].completed");
    setValue("actions[" + index + "].completed", !isCompleted);
    console.log("setou o valuje")
  };

  return (
    <Accordion
      expanded={chosen === index}
      onChange={() => {
        handleChosen(index);
      }}
    >
      <AccordionSummary
        expandIcon={<ExpandMoreIcon />}
        aria-controls="panel1bh-content"
        id="panel1bh-header"
      >
        <Grid container direction="row" alignItems="center" spacing={2}>
          <Grid item xs={12} sm={4}>
            <BasicSelect
              control={control}
              label={"Tipo Ação"}
              readonly={fromAction}
              name={"actions[" + index + "]." + "actionTypeId"}
              error={errors.actionTypeId as FieldError}
              values={actionsTypes}
            />
          </Grid>
          <Grid item xs={12} sm={3}>
            <ActionTypeInput
              control={control}
              errors={errors}
              actionTypeId={watch("actions[" + index + "]." + "actionTypeId")}
              //actionTypeId={1}
              setError={setError}
              setValue={setValue}
              index={index}
              resetField={resetField}
            />
          </Grid>
          <Grid item xs={12} sm={4}>
            <Progress
              percent={watch("actions[" + index + "].completed") ? 100 : 0}
            />
          </Grid>
          <Grid item xs={12} sm={1}>
            <IconButton
              aria-label="complete"
              onClick={() => onCompleteAction()}
              color={
                watch("actions[" + index + "].completed")
                  ? "success"
                  : "inherit"
              }
              title="Concluir Tarefa"
              size="large"
            >
              <TaskAltIcon fontSize="inherit" />
            </IconButton>
          </Grid>
        </Grid>
      </AccordionSummary>
      <AccordionDetails>
        {watch("actions[" + index + "].completed") && (
          <Grid container direction="row" gap={1}>
            <Grid item xs={5}>
              <BasicDateTimePicker
                label={"Data Conclusão"}
                name={"actions[" + index + "]." + "completionDate"}
                control={control}
                error={errors.start as FieldError}
              />
            </Grid>
            <Grid item xs={6}>
            <BasicSelect
              control={control}
              label={"Usuário Conclusão"}
              name={"actions[" + index + "]." + "userComplete"}
              error={errors.actionTypeId as FieldError}
              values={users}
            />
            </Grid>
          </Grid>
        )}
        <Grid item xs={12}>
          {!fromAction && (
            <PlantProvider>
              <PlantsTableAction
                onCheckboxSelect={onCheckboxSelection}
                selectedPlants={selectedPlants}
                setSelectedPlants={setSelectedPlants}
              ></PlantsTableAction>
            </PlantProvider>
          )}
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
