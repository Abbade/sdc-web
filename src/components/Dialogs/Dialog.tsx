import * as React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import TrashLote from '../../pages/nursery/[id]/trash-lote';
import { useEffect } from 'react';
import { ReactJSXElement } from '@emotion/react/types/jsx-namespace';



export interface SimpleDialogProps {
  open: boolean;
  onClose: (value: string) => void;
  title: string;
  children: ReactJSXElement
}



export default function SimpleDialog(props: SimpleDialogProps) {

  const { onClose, open, children, } = props;
  const handleClose = () => {
    onClose('');
  };



  const handleListItemClick = (value: string) => {
    console.log(value)
    onClose(value);
  };

  return (
    <Dialog title={children.props} onClose={handleClose} open={open}>
      {children}
    </Dialog>
  );
}
