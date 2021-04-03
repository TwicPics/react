/* eslint react/prop-types: "off" */
import React, { useEffect } from "react";

import { Context } from "../utils/context";

const { Provider } = Context;

const Twicpics = (props) => {
  useEffect(() => {
    if (typeof window !== "undefined") {
      const domainUrl = `${props.domain}/?v1`;
      const el = document.createElement("script");
      const params =
        props.defaultParams &&
        Object.entries(props.defaultParams)
          .map(([key, value]) => {
            if (key === "maxDpr") return `&max-dpr=${value}`;
            else return `&${key}=${value}`;
          })
          .join("");

      el.src = props.defaultParams ? domainUrl + params : domainUrl;

      const link = document.createElement("link");
      link.setAttribute("rel", "preconnect");
      link.setAttribute("href", props.domain);

      document.head.appendChild(link);
      document.head.appendChild(el);
    }
  }, []);

  return (
    <Provider value={{ params: props.defaultParams, domain: props.domain }}>
      {props.children}
    </Provider>
  );
};

export default Twicpics;
