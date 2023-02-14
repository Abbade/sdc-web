import { useContext, useEffect, useState } from "react";
import { Control, FieldError, FieldErrors, FieldValues, UseFormResetField, UseFormSetError, UseFormSetValue } from "react-hook-form";
import { ACTION_TYPE } from "../../../constants/ACTION_TYPE";
import { AlertContext } from "../../../contexts/AlertContext";
import { api } from "../../../services/apiClient";
import BasicSelect from "../../Inputs/BasicSelect";
import { ICreateAction } from "./CreateAction";

export interface ActionTypeInputProps {
  control: Control<FieldValues, any>;
  errors: FieldErrors<FieldValues>;
  actionTypeId?: number;
  setError: UseFormSetError<FieldValues>;
  setValue: UseFormSetValue<FieldValues>;
  resetField: UseFormResetField<FieldValues>;
}

type ItemType = {
  id: number;
  name: string;
};

interface ActionTypeValidationProps {
    success: boolean;
    msg: string;
}

export default function ActionTypeInput({
  control,
  errors,
  actionTypeId,
  setError,
  setValue,
  resetField
}: ActionTypeInputProps) {
  const [recipients, setRecipients] = useState<ItemType[]>([]);
  const [plantStage, setPlantStage] = useState<ItemType[]>([]);
  const [trashReasons, setTrashReasons] = useState<ItemType[]>([]);
  const { setOpenLoading } = useContext(AlertContext);

  

  useEffect(() => {
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
    const getTrashReasons = async () => {
      var response = await api.get("/trash-reason");
      setTrashReasons(response.data.itens);
    };

    const reset = () => {
        resetField('recipientId');
        resetField('stageId');
        resetField('trashReasonId');
    }
    reset();
    const actionTypeIdNum =
    actionTypeId == undefined
      ? -1
      : Number.parseInt(actionTypeId.toString());

    switch (actionTypeIdNum) {
      case ACTION_TYPE.TRANSPLANTE:
        getRecipients();
        break;
      case ACTION_TYPE.ALTERA_FASE_CULTIVO:
        getPlantStage();
        break;
      case ACTION_TYPE.DESCARTE_PLANTA:
        getTrashReasons();
        break;
    }
  }, [actionTypeId, setOpenLoading, resetField]);

  const ActionTypeInputs = (props) => {
    const actionType = props.actionType;
    const actionTypeIdNum =
      isNaN(Number.parseInt(actionType)) || actionType == undefined
        ? -1
        : Number.parseInt(actionType);

    switch (actionTypeIdNum) {
      case ACTION_TYPE.TRANSPLANTE:
        return (
          <BasicSelect
            control={control}
            label={"Recipiente"}
            name={"recipientId"}
            error={errors.recipientId as FieldError}
            values={recipients}
          />
        );
      case ACTION_TYPE.ALTERA_FASE_CULTIVO:
        return (
          <BasicSelect
            control={control}
            label={"Fase de Cultivo"}
            name={"stageId"}
            error={errors.stageId as FieldError}
            values={plantStage}
          />
        );
      case ACTION_TYPE.DESCARTE_PLANTA:
        return (
          <BasicSelect
            label={"Trash Reason"}
            name={"trashReasonId"}
            values={trashReasons}
            control={control}
            error={errors.trashReasonId as FieldError}
          />
        );
      default:
        return <></>;
    }
  };

  return (
    <>
      <ActionTypeInputs actionType={actionTypeId}></ActionTypeInputs>
    </>
  );
}
