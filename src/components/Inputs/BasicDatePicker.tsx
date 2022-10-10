import * as React from "react";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { format } from "date-fns";
import TextField from "@mui/material/TextField";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { Control, FieldError, FieldValues, Controller } from "react-hook-form";

interface DatePickerParams {
  label: string;
  name: string;
  error?: FieldError;
  control: Control<FieldValues, any>;
}
export default function BasicDatePicker({ label, name, error, control }: DatePickerParams) {

  return (
    <LocalizationProvider dateAdapter={AdapterDateFns}>
      <Controller
        name={name}
        control={control}
        render={({ field: { onChange, value = null } }) => (
          <DatePicker
            inputFormat="dd/MM/yyyy"
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
