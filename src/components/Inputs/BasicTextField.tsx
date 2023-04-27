import * as React from "react";
import Box from "@mui/material/Box";
import FormControl from "@mui/material/FormControl";
import { FieldError, Controller, FieldValues, Control } from "react-hook-form";
import { TextField, TextFieldProps } from "@mui/material";

type selectParams = Omit<TextFieldProps, "error"> & {
  name: string;
  error?: FieldError;
  control?: Control<FieldValues, any>;
};
export default function BasicTextField({
  name,
  label,
  control,
  multiline,
  minRows,
  error = null,
  type = "text",
  disabled = false,
  ...rest
}: selectParams) {
  return (
    <Box sx={{ minWidth: 120 }}>
      <FormControl fullWidth>
        {control ? (
          <Controller
            name={name}
            control={control}
            render={({ field: { onChange, value = "" } }) => (
              <TextField
                onChange={onChange}
                value={value}
                label={label}
                error={!!error}
                variant="outlined"
                multiline={multiline}
                helperText={error?.message}
                type={type}
                disabled={disabled}
                minRows={minRows}
                {...rest}
              />
            )}
          />
        ) : (
          <TextField
  
            label={label}
            variant="outlined"
            type={type}
            {...rest}
          />
        )}
      </FormControl>
    </Box>
  );
}
