import * as React from 'react';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';

import TextField from '@mui/material/TextField';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
interface DatePickerParams {
  label: string;
  name: string;

}
export default function BasicDatePicker({label, name}: DatePickerParams) {


  const [value, setValue] = React.useState('');

  const handleChange = (event: any) => {
    setValue(event.target.value as string);
  };
  return (
    <LocalizationProvider dateAdapter={AdapterDateFns}>
      <DatePicker
        inputFormat="dd/MM/yyyy"
        // disableMaskedInput={false} 
        label={label}
        value={value}
        onChange={(newValue) => {
          setValue(newValue);
        }}
        renderInput={(params) => <TextField {...params} name={name} fullWidth/>}
      />
    </LocalizationProvider>
  );
}