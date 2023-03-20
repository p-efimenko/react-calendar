import Head from "next/head";
import { useState } from "react";
import { useGoogleLogin } from "@react-oauth/google";

import { Button } from "@mui/material";
import { Header, Calendar } from "@/components";

import axios from "axios";

import { store } from "@/store/store";
import { saveState } from "@/utils";

// here we subscribe to the store changes

// Define a function to save the current state to localStorage
const saveStateToLocalStorage = () => {
  const events = store.getState().events;
  saveState("events", events.events);
};

store.subscribe(saveStateToLocalStorage);

import { type NextPage } from "next";

const Home: NextPage = () => {
  const [isAuth, setIsAuth] = useState(true);
  const [isLoading, setIsLoading] = useState(true);

  // TODO
  const handleLogin = useGoogleLogin({
    onSuccess: async (response) => {
      const { data } = await axios.post("http://localhost:5000/auth/google", {
        code: response.code,
      });

      setIsAuth(true);
    },
    flow: "auth-code",
    select_account: true,
    scope: [
      "openid",
      "https://www.googleapis.com/auth/userinfo.profile",
      "https://www.googleapis.com/auth/userinfo.email",
      "https://www.googleapis.com/auth/calendar.readonly",
      "https://www.googleapis.com/auth/calendar.events",
    ].join(" "),
  });

  return (
    <>
      <Head>
        <title>React - Calendar</title>
      </Head>
      <main>
        {isAuth ? (
          <>
            <Header />
            <Calendar />
          </>
        ) : (
          <Button onClick={() => handleLogin()}>Login</Button>
        )}
      </main>
    </>
  );
};

export default Home;
