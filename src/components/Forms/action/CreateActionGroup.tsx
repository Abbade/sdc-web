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

export type ICreateActionGroup = {
  title?: string;
  desc?: string;
  start: Date;
  end: Date;
  allDay: boolean;
};
type RoleData = {
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
  allDay: yup.boolean()
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

  useEffect(() => {
    console.log(form.allDay);
    setValue("start", form.start);
    setValue("end", form.end);
    setValue("allDay", form.allDay);
  }, [setValue, form]);

  const handleLoteSubmit: SubmitHandler<ICreateActionGroup> = async (
    formData
  ) => {
    try {
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

  // popover ação

  const [btnItemAction, setBtnItemAction] = useState<HTMLButtonElement | null>(
    null
  );

  const handleClickItemAction = (
    event: React.MouseEvent<HTMLButtonElement>
  ) => {
    setBtnItemAction(event.currentTarget);
  };

  const handleCloseItemAction = () => {
    setBtnItemAction(null);
  };

  const openAddItemAction = Boolean(btnItemAction);
  const id = openAddItemAction ? "popover-addItemAction" : undefined;

  // fim popover

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
                  aria-describedby={id}
                  variant="contained"
                  onClick={handleClickItemAction}
                  fullWidth
                >
                  Adicionar Ação
                </Button>
                <Popover
                  id={id}
                  open={openAddItemAction}
                  anchorEl={btnItemAction}
                  onClose={handleCloseItemAction}
                  anchorOrigin={{
                    vertical: "bottom",
                    horizontal: "left",
                  }}
                >
                  <Typography sx={{ p: 2 }}>
                    The content of the Popover.
                  </Typography>
                </Popover>
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
