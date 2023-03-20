import React from "react";
import Head from "next/head";

import { Provider as ReduxProvider } from "react-redux";

import { GoogleOAuthProvider } from "@react-oauth/google";

import { LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";

import { ThemeProvider } from "@mui/material/styles";
import { CacheProvider, EmotionCache } from "@emotion/react";

import { theme } from "@/theme";
import { createEmotionCache } from "@/utils";

import { AppProps } from "next/app";
import { type AppType } from "next/dist/shared/lib/utils";

import CssBaseline from "@mui/material/CssBaseline";

import { store } from "@/store/store";
import { saveState } from "@/utils";

import { env } from "@/env.mjs";

// Client-side cache, shared for the whole session of the user in the browser.
const clientSideEmotionCache = createEmotionCache();

export interface MyAppProps extends AppProps {
  emotionCache?: EmotionCache;
}

import "@/styles/globals.css";

const MyApp: AppType = (props: MyAppProps) => {
  //
  const { Component, emotionCache = clientSideEmotionCache, pageProps } = props;

  return (
    <>
      <Head>
        <meta name="viewport" content="initial-scale=1, width=device-width" />
      </Head>
      <GoogleOAuthProvider clientId={env.NEXT_PUBLIC_CLIENT_ID}>
        <ReduxProvider store={store}>
          <CacheProvider value={emotionCache}>
            <LocalizationProvider dateAdapter={AdapterDateFns}>
              <ThemeProvider theme={theme}>
                {/* CssBaseline kickstart an elegant, consistent, and simple baseline to build upon. */}
                <CssBaseline />
                <Component suppressHydrationWarning {...pageProps} />
              </ThemeProvider>
            </LocalizationProvider>
          </CacheProvider>
        </ReduxProvider>
      </GoogleOAuthProvider>
    </>
  );
};

export default MyApp;
