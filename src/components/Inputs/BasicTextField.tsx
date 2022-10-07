import * as React from 'react';
import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import { TextField } from '@mui/material';

interface selectParams {
    label: string;
    name: string;

}

export default function BasicTextField({label, name}: selectParams) {
  const [value, setValue] = React.useState('');

  const handleChange = (event: any) => {
    setValue(event.target.value as string);
  };

  return (
    <Box sx={{ minWidth: 120 }}>
      <FormControl fullWidth>
        {/* <InputLabel id={name}>{name}</InputLabel> */}
        <TextField
          id={name}
          onChange={handleChange}
          value={value}
          label={name}
          name={name}
        >
        </TextField>
      </FormControl>
    </Box>
  );
}