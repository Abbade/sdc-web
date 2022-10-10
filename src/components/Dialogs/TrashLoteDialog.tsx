import * as React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import TrashLote from '../../pages/nursery/[id]/trash-lote';



export interface SimpleDialogProps {
  open: boolean;
  selectedValue: string;
  onClose: (value: string) => void;
  id: any;
}

function SimpleDialog(props: SimpleDialogProps) {

  const { onClose, selectedValue, open } = props;

  const handleClose = () => {
    onClose(selectedValue);
  };

  const handleListItemClick = (value: string) => {
    console.log(value)
    onClose(value);
  };

  return (
    <Dialog onClose={handleClose} open={open}>
      <TrashLote  idLote={props}></TrashLote>
    </Dialog>
  );
}

export default function SimpleDialogDemo(id) {
  const [open, setOpen] = React.useState(false);
  const [selectedValue, setSelectedValue] = React.useState();
  console.log(selectedValue)
  console.log(id.id)
  const handleClickOpen = () => {
  console.log(selectedValue)
  console.log(event)
    setOpen(true);
  };

  const handleClose = (value: string) => {
    setOpen(false);
    // setSelectedValue(value);
  };

  return (
    <div>
      <Button onClick={handleClickOpen}>TEST</Button>
      <SimpleDialog
        id={id.id}
        selectedValue={selectedValue}
        open={open}
        onClose={handleClose}
      
      />
    </div>
  );
}
