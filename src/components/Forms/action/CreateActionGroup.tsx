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
import ForestIcon from '@mui/icons-material/Forest';

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
    formState: { errors, isSubmitting },
  } = useForm({ resolver: yupResolver(createObjFormSchema) });

  const { setAlert, setOpenLoading, showAlert } = useContext(AlertContext);
  const [openForm, setOpenForm] = useState(false);
  const [actionsTypes, setActionsTypes] = useState<ItemType[]>([]);
  const [actions, setActions] = useState([] as ICreateAction[]);

  const onCloseActionItems = (actionSave: ICreateAction) => {
    console.log(actionSave);
    if(actionSave != null){
      if(actionSave.actionTypeId != null){
        let actionExists = actions.filter(x => x.actionTypeId === actionSave.actionTypeId)[0];
        if(actionExists != null){
          showAlert("Ação ja existe", "error");
        }
        else{
          setActions([ ...actions, actionSave]);
          setOpenForm(false);
        }

      }
    
    }
  

  };
  const openAddActionItems = () => {
    setOpenForm(true);
  };

  const onRemoveAction = (action) => {
    setActions(actions.filter(x => x !== action));
  }

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

  const handleLoteSubmit: SubmitHandler<ICreateActionGroup> = async (
    formData
  ) => {
    try {
      formData.actions = actions;
      console.log(formData);

      setOpenLoading(true);
      //  const item = await api.post("actiongroup", formData);
      setOpenLoading(false);
      showAlert("Ação cadastrada com sucesso.", "success");
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
                <List>
                  {actions?.map((action, index) => (
                    <>
                      <ListItem
                        secondaryAction={
                          <IconButton edge="end" aria-label="delete" onClick={() => onRemoveAction(action)}>
                            <DeleteIcon />
                          </IconButton>
                        }
                      >
                        <ListItemAvatar>
                          <Avatar>
                            <ForestIcon />
                          </Avatar>
                        </ListItemAvatar>
                        <ListItemText
                          primary={actionsTypes.filter(x => x.id === action.actionTypeId)[0]?.name}
                          secondary={action.plants.length + ' Planta(s)'}
                        />
                      </ListItem>
                    </>
                  ))}
                </List>
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
      <FormDialog
        size="md"
        onClose={onCloseActionItems}
        open={openForm}
        title="Adicionar Ação"
      >
        <CreateAction onClose={onCloseActionItems} />
      </FormDialog>
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
