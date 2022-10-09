import * as React from "react";
import Box from "@mui/material/Box";
import FormControl from "@mui/material/FormControl";
import { FieldError, Controller, FieldValues, Control } from "react-hook-form";
import { TextField, TextFieldProps } from "@mui/material";

interface selectParams {
  label: string;
  name: string;
  error?: FieldError;
  control?: Control<FieldValues, any>;
}
export default function BasicTextField({
  name,
  label,
  control,
  error = null,
}: selectParams) {
  return (
    <Box sx={{ minWidth: 120 }}>
      <FormControl fullWidth>
        <Controller
          name={name}
          control={control}
          render={({ field: { onChange, value = '' } }) => (
            <TextField
              onChange={onChange}
              value={value}
              label={label}
              error={!!error}
              helperText={error?.message}
            />
          )}
        />
      </FormControl>
    </Box>
  );
}
