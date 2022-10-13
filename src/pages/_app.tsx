import { AuthProvider } from "../contexts/AuthContext";

import * as React from "react";
import Head from "next/head";
import { AppProps } from "next/app";
import { ThemeProvider } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import { CacheProvider, EmotionCache } from "@emotion/react";
import theme from "../styles/theme";
import createEmotionCache from "../styles/createEmotionCache";
import Layout from "../components/Layout";
import { AlertProvider } from "../contexts/AlertContext";
import SnackbarAlert from "../components/SnackbarAlert";

// Client-side cache, shared for the whole session of the user in the browser.

interface MyAppProps extends AppProps {
  emotionCache?: EmotionCache;
}

function MyApp(props: MyAppProps) {
  const { Component, pageProps } = props;
  
  const isLayoutNeeded = ![`/login`].includes(props.router.pathname);

 
const LayoutComponent = isLayoutNeeded ? Layout : React.Fragment;
  return (
    <AuthProvider>
      <AlertProvider>
      <Head>
        <meta name="viewport" content="initial-scale=1, width=device-width" />
      </Head>
      <ThemeProvider theme={theme}>

          <SnackbarAlert />
          <CssBaseline />
          <LayoutComponent>
            <Component {...pageProps} />
          </LayoutComponent>
  
      </ThemeProvider>
      </AlertProvider>
    </AuthProvider>
  );
}

export default MyApp;
