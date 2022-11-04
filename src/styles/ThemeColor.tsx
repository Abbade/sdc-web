import { useTheme } from '@mui/material/styles';

export default function ThemeColor() {
  const theme = useTheme();
  return (
    <meta name="theme-color" content={theme.palette.background.default} />
  );
}
