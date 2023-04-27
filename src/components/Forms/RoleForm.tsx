import * as React from "react";
import Box from "@mui/material/Box";
import FormControl from "@mui/material/FormControl";
import { FieldError, Controller, FieldValues, Control } from "react-hook-form";
import { TextField, TextFieldProps } from "@mui/material";

type SelectParams = TextFieldProps | {
  name: string;
  error?: FieldError;
  control?: Control<FieldValues, any>;
};

const BasicTextField = ({
  name,
  label,
  control,
  multiline,
  minRows,
  error = null,
  type = "text",
  disabled = false,
  ...rest
}: SelectParams) => {
  return (
    <Box sx={{ minWidth: 120 }}>
      <FormControl fullWidth>
        <Controller
          name={name}
          control={control}
          render={({ field }) => (
            <TextField
              {...field}
              label={label}
              error={!!error}
              multiline={multiline}
              helperText={error?.message}
              type={type}
              disabled={disabled}
              minRows={minRows}
              {...rest}
            />
          )}
        />
      </FormControl>
    </Box>
  );
};

export default BasicTextField;
