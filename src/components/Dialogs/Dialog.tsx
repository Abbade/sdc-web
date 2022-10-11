import * as React from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import { ReactJSXElement } from '@emotion/react/types/jsx-namespace';

export interface DialogProps {
  open: boolean;
  onClose: (value: string) => void;
  title: string;
  children: ReactJSXElement;
  buttonIcon: ReactJSXElement;
  buttonColor: any;
}

export default function FormDialog(props: DialogProps) {
  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <div align-center>
      <Button color={props?.buttonColor} variant="outlined" onClick={handleClickOpen}>
        {props?.buttonIcon}
      </Button>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>{props?.title}</DialogTitle>
        <DialogContent>
        {props?.children}
         
        </DialogContent>
        <DialogActions>
          {/* <Button onClick={handleClose}>Cancel</Button>
          <Button onClick={handleClose}>Subscribe</Button> */}
        </DialogActions>
      </Dialog>
    </div>
  );
}