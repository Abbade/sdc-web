import { yupResolver } from "@hookform/resolvers/yup";
import { Button } from "@mui/material";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";
import { useContext, useEffect, useState } from "react";
import { FieldError, SubmitHandler, useForm } from "react-hook-form";
import * as yup from "yup";
import { AlertContext } from "../../../contexts/AlertContext";
import { api } from "../../../services/apiClient";
import { withSSRAuth } from "../../../utils/withSSRAuth";
import BasicTextField from "../../Inputs/BasicTextField";
import { DateTimePicker } from "@mui/x-date-pickers/DateTimePicker";
import BasicDateTimePicker from "../../Inputs/BasicDateTimePicker";
import Popover from "@mui/material/Popover";
import Typography from "@mui/material/Typography";
import BasicCheckbox from "../../Inputs/BasicCheckbox";
import CreateAction, { ICreateAction } from "./CreateAction";
import FormDialog from "../../Dialogs/Dialog";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemAvatar from "@mui/material/ListItemAvatar";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import Avatar from "@mui/material/Avatar";
import IconButton from "@mui/material/IconButton";
import FormGroup from "@mui/material/FormGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import FolderIcon from "@mui/icons-material/Folder";
import DeleteIcon from "@mui/icons-material/Delete";
import ForestIcon from "@mui/icons-material/Forest";
import { ActionTypeProvider } from "../../../contexts/ActionTypeContext";
import { ACTION_TYPE } from "../../../constants/ACTION_TYPE";

export type ICreateActionGroup = {
  title?: string;
  desc?: string;
  start: Date;
  end: Date;
  allDay: boolean;
  actions?: ICreateAction[];
};

type ItemType = {
  id: number;
  name: string;
};

export interface CreateActionInterface {
  onClose?: (refresh?: boolean) => void;
  form: ICreateActionGroup;
}

const createObjFormSchema = yup.object().shape({
  title: yup.string().required("Título é obrigatório"),
  desc: yup.string().required("Descrição é obrigatória"),
  start: yup.date().required("Data início é obrigatória"),
  end: yup.date().required("Data fim é obrigatória"),
  allDay: yup.boolean(),
});

export default function CreateActionGroup({
  form,
  onClose,
}: CreateActionInterface) {
  const {
    register,
    handleSubmit,
    control,
    setValue,
    resetField,
    setError,
    getValues,
    watch,
    formState: { errors, isSubmitting },
  } = useForm({ resolver: yupResolver(createObjFormSchema) });

  const { setAlert, setOpenLoading, showAlert } = useContext(AlertContext);
  const [openForm, setOpenForm] = useState(false);
  const [actionsTypes, setActionsTypes] = useState<ItemType[]>([]);
  const [actions, setActions] = useState([] as ICreateAction[]);
  const [chosen, setChosen] = useState(-1);

  const handleChosen = (chosenOne: number) => {
    if (chosenOne === chosen) setChosen(-1);
    else setChosen(chosenOne);
  };

  const onCloseActionItems = (actionSave: ICreateAction) => {
    console.log(actionSave);
    if (actionSave != null) {
      if (actionSave.actionTypeId != null) {
        let actionExists = actions.filter(
          (x) => x.actionTypeId === actionSave.actionTypeId
        )[0];
        if (actionExists != null) {
          showAlert("Ação ja existe", "error");
        } else {
          setActions([...actions, actionSave]);
          setOpenForm(false);
        }
      }
    }
  };
  const openAddActionItems = () => {
    setActions([...actions, {} as ICreateAction]);
    let actionsValues = getValues("actions") as ICreateAction[];
    if (actionsValues == null) actionsValues = [];
    setValue("actions", [...actionsValues, {} as ICreateAction], {
      shouldValidate: true,
    });
  };

  const onRemoveAction = (action) => {
    setActions(actions.filter((x) => x !== action));
  };

  useEffect(() => {
    console.log(form.allDay);
    setValue("start", form.start);
    setValue("end", form.end);
    setValue("allDay", form.allDay);
  }, [setValue, form]);

  useEffect(() => {
    const getActionType = async () => {
      setOpenLoading(true);
      const types = await api.get("/actionsTypes");
      setActionsTypes(types.data.itens);
      setOpenLoading(false);
    };

    getActionType();
  }, [setOpenLoading]);

  const ActionTypeValidation = (actions: ICreateAction[]): boolean => {
    let flag = true;
    if (actions != null) {
      actions.map((action, i) => {
        let actionName = "actions[" + i + "].";

        const actionTypeIdNum =
          action.actionTypeId == undefined
            ? -1
            : Number.parseInt(action.actionTypeId.toString());

        switch (actionTypeIdNum) {
          case ACTION_TYPE.TRANSPLANTE:
            if (action.recipientId == null) {
              setError(actionName + "recipientId", {
                type: "custom",
                message: "Campo obrigatório",
              });
              flag = false;
            }

            break;
          case ACTION_TYPE.ALTERA_FASE_CULTIVO:
            if (action.stageId == null) {
              setError(actionName + "stageId", {
                type: "custom",
                message: "Campo obrigatório",
              });
              flag = false;
            }
            break;
          case ACTION_TYPE.DESCARTE_PLANTA:
            if (action.trashReasonId == null) {
              setError(actionName + "trashReasonId", {
                type: "custom",
                message: "Campo obrigatório",
              });
              flag = false;
            }
            break;
        }
      });
    }

    return flag;
  };

  const ActionPlantValidation = (actions: ICreateAction[]): boolean => {
    let flag = true;
    if (actions != null && actions.length > 0) {
      actions.map((action) => {
        let plantCount = action.plants.length;
        if (plantCount <= 0) {
          flag = false;
        }
      });
    }
    return flag;
  };

  const handleLoteSubmit: SubmitHandler<ICreateActionGroup> = async (
    formData
  ) => {
    try {
      setOpenLoading(true);
      console.log(formData);
      //formData.actions = actions;
      console.log(formData);
      if (!ActionTypeValidation(formData.actions)) {
        setOpenLoading(false);
        return;
      }
      if (!ActionPlantValidation(formData.actions)) {
        showAlert("Selecione ao menos uma planta/Berçário", "error");
        setOpenLoading(false);
        return;
      }

      const item = await api.post("action-group", formData);
      setOpenLoading(false);
      showAlert("Ação cadastrada com sucesso.", "success");
      // onClose(true);
    } catch (error) {
      console.log(error);
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
          <Grid item xs={9}>
            <Grid container spacing={2}>
              <Grid item xs={12} sm={12}>
                <BasicTextField
                  label={"Título"}
                  name={"title"}
                  control={control}
                  error={errors.title as FieldError}
                />
              </Grid>

              <Grid item xs={12} sm={12}>
                <BasicTextField
                  label={"Descrição"}
                  name={"desc"}
                  multiline={true}
                  minRows={5}
                  control={control}
                  error={errors.desc as FieldError}
                />
              </Grid>
              <Grid item xs={12}>
                <ActionTypeProvider>
                  <List>
                    {actions?.map((action, index) => (
                      <CreateAction
                        key={index}
                        chosen={chosen}
                        control={control}
                        errors={errors}
                        handleChosen={handleChosen}
                        index={index}
                        resetField={resetField}
                        setError={setError}
                        setValue={setValue}
                        actionTypeId={action.actionTypeId}
                        onClose={onCloseActionItems}
                        watch={watch}
                      />
                    ))}
                  </List>
                </ActionTypeProvider>
              </Grid>
            </Grid>
          </Grid>
          <Grid item xs={3}>
            <Grid container spacing={1}>
              <Grid item xs={12}>
                <BasicDateTimePicker
                  label={"Data Início"}
                  name={"start"}
                  control={control}
                  readonly={true}
                  error={errors.start as FieldError}
                />
              </Grid>
              <Grid item xs={12}>
                <BasicDateTimePicker
                  label={"Data Fim"}
                  name={"end"}
                  readonly={true}
                  control={control}
                  error={errors.end as FieldError}
                />
              </Grid>
              <Grid item xs={12}>
                <BasicCheckbox
                  label={"Dia todo"}
                  name={"allDay"}
                  readOnly={true}
                  control={control}
                  error={errors.allDay as FieldError}
                />
              </Grid>
              <Grid item xs={12}>
                <Button
                  variant="contained"
                  onClick={openAddActionItems}
                  fullWidth
                >
                  Adicionar Ação
                </Button>
              </Grid>
            </Grid>
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
      {/* <FormDialog
        size="md"
        onClose={onCloseActionItems}
        open={openForm}
        title="Adicionar Ação"
      >
        <CreateAction onClose={onCloseActionItems} />
      </FormDialog> */}
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
