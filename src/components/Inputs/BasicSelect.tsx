import Box from "@mui/material/Box";
import FormControl from "@mui/material/FormControl";
import FormHelperText from "@mui/material/FormHelperText";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import Select, { SelectProps } from "@mui/material/Select";
import { Control, Controller, FieldError, FieldValues } from "react-hook-form";

interface selectParams {
  label: string;
  name: string;
  values?: any[];
  error?: FieldError;
  readonly?: boolean;
  control: Control<FieldValues, any>;
}

export default function BasicSelect({
  label,
  name,
  values,
  control,
  readonly,
  error = null,
}: selectParams) {
  const preventPropagation = (e) => {
    e.stopPropagation();
    e.preventDefault();
}
  return (
    <Box sx={{ minWidth: 120 }}>
      <Controller
        control={control}
        name={name}
        render={({ field: { onChange, value = "" } }) => (
          <FormControl fullWidth error={!!error}>
            <InputLabel id={label}>{label}</InputLabel>
            <Select
              labelId={name}
              id={name}
              value={value}
              label={name}
              name={name}
              readOnly={readonly !== undefined ? readonly : false}
              onClick={preventPropagation}
              onChange={onChange}
            >
              {values?.map((selectValue) => {
                return (
                  <MenuItem
                    key={selectValue.id.toString()}
                    value={selectValue.id.toString()}
                  >
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
