import * as React from "react";
import Box from "@mui/material/Box";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import {
  FieldError,
  FieldErrorsImpl,
  Merge,
  Controller,
  FieldValues,
  Control,
} from "react-hook-form";
import FormHelperText from "@mui/material/FormHelperText";

interface selectParams {
  label: string;
  name: string;
  values?: any[];
  error?: FieldError;
  control: Control<FieldValues, any>;
}

export default function BasicSelect({
  label,
  name,
  values,
  control,
  error = null,

}: selectParams) {
  return (
    <Box sx={{ minWidth: 120 }}>
      <Controller
        control={control}
        name={name}
        render={({ field: { onChange, value = '' } }) => (
          <FormControl fullWidth error={!!error}>
            <InputLabel id={label}>{label}</InputLabel>
            <Select
              labelId={name}
              id={name}
              value={value}
              label={name}
              name={name}
              onChange={onChange}

            >
              {values?.map((selectValue) => {
                return (
                  <MenuItem key={selectValue.id.toString()} value={selectValue.id.toString()}>
                    {selectValue.name}
                  </MenuItem>
                );
              })}
            </Select>
            {!!error && <FormHelperText> {error?.message}</FormHelperText>}
          </FormControl>
        )}
      />
    </Box>
  );
}
