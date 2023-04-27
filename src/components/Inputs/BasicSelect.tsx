import Box from "@mui/material/Box";
import FormControl from "@mui/material/FormControl";
import FormHelperText from "@mui/material/FormHelperText";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import Select, { SelectProps } from "@mui/material/Select";
import { SelectInputProps } from "@mui/material/Select/SelectInput";
import { MouseEventHandler } from "react";
import { Control, Controller, FieldError, FieldValues } from "react-hook-form";

type selectParams = Omit<SelectProps, "error"> & {
  label: string;
  name: string;
  values?: any[];
  error?: FieldError;
  readonly?: boolean;
  control?: Control<FieldValues, any>;
  permissions?: string[];
  onAddNew?: () => void;
  formHelperText?: string;
};

export default function BasicSelect({
  label,
  name,
  values,
  control,
  readonly,
  error = null,
  permissions,
  onAddNew,
  formHelperText,
  ...rest
}: selectParams) {
  const preventPropagation = (e) => {
    e.stopPropagation();
    e.preventDefault();
  };
  return (
    <Box sx={{ minWidth: 120 }}>
      {control ? (
        <Controller
          control={control}
          name={name}
          render={({ field: { onChange, value = "" } }) => (
            <FormControl fullWidth error={!!error}>
              <InputLabel id={label}>{label}</InputLabel>
              <Select
                {...rest}
                labelId={name}
                id={name}
                value={value}
                label={name}
                name={name}
                readOnly={readonly !== undefined ? readonly : false}
                onClick={preventPropagation}
                onChange={onChange}
              >
                {onAddNew && (
                  <MenuItem value="" onClick={onAddNew}>
                    Adicione Novo
                  </MenuItem>
                )}

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
              {!!error ? (
                <FormHelperText> {error?.message}</FormHelperText>
              ) : formHelperText ? (
                <FormHelperText>formHelperText</FormHelperText>
              ) : (
                <></>
              )}
            </FormControl>
          )}
        />
      ) : (
        <FormControl fullWidth>
          <InputLabel id={label}>{label}</InputLabel>
          <Select
            {...rest}
            labelId={name}
            id={name}
            label={name}
            name={name}
            onClick={preventPropagation}
          >
            {onAddNew && (
              <MenuItem value="" onClick={onAddNew}>
                Adicione Novo
              </MenuItem>
            )}

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
        </FormControl>
      )}
    </Box>
  );
}
