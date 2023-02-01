import * as React from "react";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { format } from "date-fns";
import TextField from "@mui/material/TextField";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { Control, FieldError, FieldValues, Controller } from "react-hook-form";
import { DateTimePicker } from "@mui/x-date-pickers";
import FormGroup from "@mui/material/FormGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import { FormHelperText } from "@mui/material";

interface DatePickerParams {
  label: string;
  name: string;
  error?: FieldError;
  control: Control<FieldValues, any>;
  readOnly?: boolean;
}
export default function BasicCheckbox({
  label,
  name,
  error,
  control,
  readOnly,
}: DatePickerParams) {
  return (
    <LocalizationProvider dateAdapter={AdapterDateFns}>
      <Controller
        name={name}
        control={control}
        render={({ field: { onChange, value = false } }) => (
          <FormGroup>
            <FormControlLabel
              control={<Checkbox disabled={readOnly} checked={value} onChange={(event) => onChange(event.target.checked)} />}
              label={label}
            />
              {!!error && <FormHelperText> {error?.message}</FormHelperText>}
          </FormGroup>
        )}
      />
    </LocalizationProvider>
  );
}
