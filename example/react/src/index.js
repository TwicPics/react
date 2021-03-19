import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import "./index.css";

import { Twicpics } from "react-twicpics";

ReactDOM.render(
  <React.StrictMode>
    <Twicpics
      domain="https://demo.twic.pics"
      defaultParams={{
        anticipation: 0.5,
        maxDpr: 2,
        step: 100,
      }}
    >
      <App />
    </Twicpics>
  </React.StrictMode>,
  document.getElementById("root")
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
