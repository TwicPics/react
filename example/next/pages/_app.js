import React from "react";
import { Twicpics } from "@twicpics/react";
import "./index.css";

function MyApp({ Component, pageProps }) {
  return (
    <Twicpics
      domain="https://demo.twic.pics"
      defaultParams={{
        anticipation: 0.5,
        maxDpr: 2,
        step: 100,
      }}
    >
      <Component {...pageProps} />
    </Twicpics>
  );
}

export default MyApp;
