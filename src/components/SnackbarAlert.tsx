import MuiAlert, { AlertProps } from '@mui/material/Alert';
import Snackbar from '@mui/material/Snackbar';
import Stack from '@mui/material/Stack';
import * as React from 'react';

import { AlertContext } from '../contexts/AlertContext';

const Alert = React.forwardRef<HTMLDivElement, AlertProps>(function Alert(
  props,
  ref,
) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

export default function SnackbarAlert() {
  const { openAlert, alertType, alertMessage, closeAlert } = React.useContext(AlertContext);

  const handleClose = (event?: React.SyntheticEvent | Event, reason?: string) => {
    if (reason === 'clickaway') {
      return;
    }
    closeAlert();
  };

  return (
    <Stack spacing={2} sx={{ width: '100%' }}>
      <Snackbar open={openAlert} autoHideDuration={3000} onClose={handleClose}>
        <Alert onClose={handleClose} severity={alertType} sx={{ width: '100%' }}>
          {alertMessage}
        </Alert>
      </Snackbar>
    </Stack>
  );
}
