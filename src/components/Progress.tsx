import * as React from 'react';
import LinearProgress, { LinearProgressProps } from '@mui/material/LinearProgress';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';

function LinearProgressWithLabel(props: LinearProgressProps & { value: number }) {
  return (
    <Box sx={{ display: 'flex', alignItems: 'center' }}>
      <Box sx={{ width: '100%', mr: 1 }}>
        <LinearProgress variant="determinate" color={props.value === 100 ? 'success' : 'inherit'} {...props} />
      </Box>
      <Box sx={{ minWidth: 35 }}>
        <Typography variant="body2" color={props.value === 100 ? 'text.success' : 'text.secondary'}>{`${Math.round(
          props.value,
        )}%`}</Typography>
      </Box>
    </Box>
  );
}
export interface ProgressInterface{
    percent: number;
}
export default function Progress({ percent} : ProgressInterface) {
  const [progress, setProgress] = React.useState(0);

  React.useEffect(() => {
    setProgress(percent);
  },[percent])


  return (
    <Box sx={{ width: '100%' }}>
      <LinearProgressWithLabel value={progress} />
    </Box>
  );
}