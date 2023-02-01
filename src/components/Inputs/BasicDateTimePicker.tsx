import * as React from "react";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { format } from "date-fns";
import TextField from "@mui/material/TextField";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { Control, FieldError, FieldValues, Controller } from "react-hook-form";
import { DateTimePicker } from "@mui/x-date-pickers";

interface DatePickerParams {
  label: string;
  name: string;
  error?: FieldError;
  control: Control<FieldValues, any>;
  readonly?: boolean;
}
export default function BasicDateTimePicker({ label, name, error, control, readonly }: DatePickerParams) {

  return (
    <LocalizationProvider dateAdapter={AdapterDateFns}>
      <Controller
        name={name}
        control={control}
        render={({ field: { onChange, value = null } }) => (
          <DateTimePicker
            readOnly={readonly}
            inputFormat="dd/MM/yyyy HH:mm:ss"
            // disableMaskedInput={false}
            label={label}
            onChange={onChange}
            value={value}
            renderInput={(params) => (
              <TextField {...params} name={name}          error={!!error}
              helperText={error?.message} fullWidth />
            )}
          />
        )}
      />
    </LocalizationProvider>
  );
}
