import { ReactJSXElement } from "@emotion/react/types/jsx-namespace";
import { Breakpoint, IconButton } from "@mui/material";
import Dialog, { DialogProps } from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import CloseIcon from '@mui/icons-material/Close';

type GenericDialogProps = DialogProps & {
  open: boolean;
  onClose: (refresh: any) => void;
  title: string;
  children: ReactJSXElement;
  size?: undefined | Breakpoint;
};

export default function FormDialog({
  open,
  size,
  title,
  children,
  onClose,
  ...rest
}: GenericDialogProps) {
  const handleClose = () => {
    onClose(false);
  };

  return (
    <div>
      <Dialog
        {...rest}
        open={open}
        onClose={handleClose}
        fullWidth
        maxWidth={size != null ? size : "sm"}
      >
        <DialogTitle>{title} 
        {onClose ? (
        <IconButton
          aria-label="close"
          onClick={onClose}
          sx={{
            position: 'absolute',
            right: 8,
            top: 8,
            color: (theme) => theme.palette.grey[500],
          }}
        >
          <CloseIcon />
        </IconButton>
      ) : null}
        </DialogTitle>
        <DialogContent>{children}</DialogContent>
        <DialogActions>
          {/* <Button onClick={handleClose}>Cancel</Button>
          <Button onClick={handleClose}>Subscribe</Button> */}
        </DialogActions>
      </Dialog>
    </div>
  );
}
