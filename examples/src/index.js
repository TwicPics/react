import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import "./index.css";

import { TwicPics } from "@twicpics/react";

TwicPics({
  domain: "https://demo.twic.pics",
  defaultParams: {
    anticipation: 0.5,
    maxDPR: 2,
    step: 100,
  },
});

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById("root")
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
