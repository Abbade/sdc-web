import * as React from 'react';
import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select, { SelectChangeEvent } from '@mui/material/Select';

interface selectParams {
    label: string;
    name: string;
    values?: any[];

}

export default function BasicSelect({label, name, values}: selectParams) {
  const [value, setValue] = React.useState('');

  const handleChange = (event: SelectChangeEvent) => {
    setValue(event.target.value as string);
  };

  return (
    <Box sx={{ minWidth: 120 }}>
      <FormControl fullWidth>
        <InputLabel id={label}>{label}</InputLabel>
        <Select
          labelId={name}
          id={name}
          value={value}
          label={name}
          name={name}
          onChange={handleChange}
        >
          {values?.map( (selectValue) => {
            return <MenuItem key={selectValue.id} value={selectValue.id}>{selectValue.name}</MenuItem>
          })}
        </Select>
      </FormControl>
    </Box>
  );
}