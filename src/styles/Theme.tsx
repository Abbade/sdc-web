import { createTheme, ThemeProvider } from '@mui/material/styles';
import * as React from 'react';
import useMediaQuery from '@mui/material/useMediaQuery';
import { AuthContext } from '../contexts/AuthContext';

export const ColorModeContext = React.createContext({ toggleColorMode: () => {} });

interface ThemeType{
  children: React.ReactNode;
}

export default function Theme({ children}: ThemeType) {
 
  const { mode, changeMode} = React.useContext(AuthContext);

  const colorMode = React.useMemo(
    () => ({
      toggleColorMode: () => {

        changeMode();
      },
    }),
    [],
  );

  const theme = React.useMemo(
    () =>
      createTheme({
        palette: {
          mode,
          // primary: {
          //   main: '#556cd6',
          // },
          // secondary: {
          //   main: '#19857b',
          // },
        },
        
      })
      ,[mode],
  );

  return (
    <ColorModeContext.Provider value={colorMode}>
      <ThemeProvider theme={theme}>
        {children}
      </ThemeProvider>
    </ColorModeContext.Provider>
  );
}
