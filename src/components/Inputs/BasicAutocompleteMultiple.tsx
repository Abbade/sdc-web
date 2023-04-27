import Autocomplete, { AutocompleteProps, AutocompletePropsSizeOverrides } from "@mui/material/Autocomplete";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import { Control, Controller, FieldError, FieldValues } from "react-hook-form";

type AutocompleteParams = AutocompletePropsSizeOverrides &  {
  label: string;
  name: string;
  // values?: any[];
  options?: any[];
  error?: FieldError;
  control: Control<FieldValues, any>;
}

export default function BasicAutocompleteMultiple({
  label,
  name,
  //values,
  control,
  options,
  error = null,
  ...rest
}: AutocompleteParams) {
  return (
    <Box sx={{ minWidth: 120 }}>
      <Controller
        control={control}
        name={name}
        // defaultValue={[{}]}
        render={({ field: { ref, onChange, value = [], ...field } }) => {
          return (
            <Autocomplete
              {...rest}
              multiple
              options={options}
              defaultValue={value}
              value={value}
              isOptionEqualToValue={(option, value) => option.id === value.id}
              getOptionLabel={(option) => option.name}
              onChange={(_, data) => onChange(data)}
              renderInput={(params) => (
                <TextField
                  {...field}
                  {...params}
                  fullWidth
                  inputRef={ref}
                  variant="filled"
                  error={!!error}
                  helperText={error?.message}
                  label={label}
                />
              )}
            />
          );
        }}
      />
    </Box>
  );
}
