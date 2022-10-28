import Autocomplete from "@mui/material/Autocomplete";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import { Control, Controller, FieldError, FieldValues } from "react-hook-form";

interface AutocompleteParams {
  label: string;
  name: string;
 // values?: any[];
  options?: any[];
  error?: FieldError;
  control: Control<FieldValues, any>;
}

export default function BasicAutocomplete({
  label,
  name,
  //values,
  control,
  options,
  error = null,
}: AutocompleteParams) {
  return (
    <Box sx={{ minWidth: 120 }}>
      <Controller
        control={control}
        name={name}
        defaultValue={[{}]}
        render={({ field: { ref, onChange, ...field } }) => (
          <Autocomplete
            multiple
            options={options}
            defaultValue={[{}]}
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
        )}
      />
    </Box>
  );
}
