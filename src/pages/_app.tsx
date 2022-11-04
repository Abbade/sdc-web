import { AuthProvider } from "../contexts/AuthContext";

import { EmotionCache } from "@emotion/react";
import CssBaseline from "@mui/material/CssBaseline";
import { AppProps } from "next/app";
import Head from "next/head";
import * as React from "react";
import Layout from "../components/Layout";
import SnackbarAlert from "../components/SnackbarAlert";
import { AlertProvider } from "../contexts/AlertContext";
import Theme from "../styles/Theme";
import ThemeColor from "../styles/ThemeColor";

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
      <Theme >
      <AlertProvider>
      <Head>
        <meta name="viewport" content="initial-scale=1, width=device-width" />
      </Head>
   
          <CssBaseline />
          <SnackbarAlert />
          <CssBaseline />
          <LayoutComponent>
            <Component {...pageProps} />
          </LayoutComponent>
  

      </AlertProvider>
      </Theme>
    </AuthProvider>
  );
}

export default MyApp;
