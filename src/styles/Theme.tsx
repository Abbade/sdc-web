import { ptBR } from "@mui/material/locale";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import * as React from "react";
import { AuthContext } from "../contexts/AuthContext";

export const ColorModeContext = React.createContext({
  toggleColorMode: () => {},
});

interface ThemeType {
  children: React.ReactNode;
}

export default function Theme({ children }: ThemeType) {
  const { mode, changeMode } = React.useContext(AuthContext);

  const colorMode = React.useMemo(
    () => ({
      toggleColorMode: () => {
        changeMode();
      },
    }),
    [changeMode]
  );

  const theme = React.useMemo(
    () =>
      createTheme(
        {
          palette: {
            mode,
          },
        },
        ptBR
      ),
    [mode]
  );

  return (
    <ColorModeContext.Provider value={colorMode}>
      <ThemeProvider theme={theme}>{children}</ThemeProvider>
    </ColorModeContext.Provider>
  );
}
