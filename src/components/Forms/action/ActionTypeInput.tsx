import { useContext, useEffect, useState } from "react";
import { Control, FieldError, FieldErrors, FieldValues, UseFormResetField, UseFormSetError, UseFormSetValue } from "react-hook-form";
import { ACTION_TYPE } from "../../../constants/ACTION_TYPE";
import { ActionTypeContext } from "../../../contexts/ActionTypeContext";
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
  index: number;
  
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
  resetField,
  index
}: ActionTypeInputProps) {

  const { setOpenLoading } = useContext(AlertContext);
  const { plantStage, recipients, trashReasons } = useContext(ActionTypeContext);

  

  useEffect(() => {
    const reset = () => {
        resetField('actions[' + index + '].' + 'recipientId');
        resetField('actions[' + index + '].' + 'stageId');
        resetField('actions[' + index + '].' + 'trashReasonId');
    }
    reset();
  }, [resetField, index]);

  const errorsIndex = errors != null && errors.actions != null && errors.actions[index] != null ? errors.actions[index] : {};

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
            name={'actions[' + index + '].' + "recipientId"}
            error={errorsIndex.recipientId as FieldError}
            values={recipients}
          />
        );
      case ACTION_TYPE.ALTERA_FASE_CULTIVO:
        return (
          <BasicSelect
            control={control}
            label={"Fase de Cultivo"}
            name={'actions[' + index + '].' + "stageId"}
            error={errorsIndex?.stageId as FieldError}
            values={plantStage}
          />
        );
      case ACTION_TYPE.DESCARTE_PLANTA:
        return (
          <BasicSelect
            label={"Trash Reason"}
            name={'actions[' + index + '].' + "trashReasonId"}
            values={trashReasons}
            control={control}
            error={errorsIndex.trashReasonId as FieldError}
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
