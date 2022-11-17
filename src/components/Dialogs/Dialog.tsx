import { ReactJSXElement } from '@emotion/react/types/jsx-namespace';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';

export interface DialogProps {
  open: boolean;
  onClose: (refresh: any) => void;
  title: string;
  children: ReactJSXElement;
}

export default function FormDialog(props: DialogProps) {

  const handleClose = () => {
    props.onClose(false);
  };

  return (
    <div>
      <Dialog open={props.open} onClose={handleClose}>
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