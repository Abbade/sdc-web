import MuiAlert, { AlertProps } from '@mui/material/Alert';
import Snackbar from '@mui/material/Snackbar';
import Stack from '@mui/material/Stack';
import * as React from 'react';
import Backdrop from '@mui/material/Backdrop';
import CircularProgress from '@mui/material/CircularProgress';

import { AlertContext } from '../contexts/AlertContext';
import { useTheme } from '@mui/material';


const Alert = React.forwardRef<HTMLDivElement, AlertProps>(function Alert(
  props,
  ref,
) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

export default function SnackbarAlert() {
  const theme = useTheme();
  const {alert, setAlert , openLoading} = React.useContext(AlertContext);

  const handleClose = (event?: React.SyntheticEvent | Event, reason?: string) => {
    if (reason === 'clickaway') {
      return;
    }
    setAlert({...alert, openAlert: false})
  };

  return (
    <>
      <Stack spacing={2} sx={{ width: '100%' }}>
        <Snackbar open={alert.openAlert} autoHideDuration={3000} onClose={handleClose}>
          <Alert onClose={handleClose} severity={alert.alertType} sx={{ width: '100%' }}>
            {alert.message}
          </Alert>
        </Snackbar>
      </Stack>
      <Backdrop
        sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.modal + 1 }}
        open={openLoading}
      >
        <CircularProgress color="inherit" />
      </Backdrop>
    </>
    
  );
}
