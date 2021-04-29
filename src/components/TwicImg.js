import React, { useContext } from "react";
import PropTypes from "prop-types";
import "./twic.module.css";

const TwicImg = ({
  src,
  alt,
  placeholder,
  ratio,
  focus,
  step,
  width,
  height,
  transition,
  transitionDuration,
  transitionTimingFunction,
  transitionDelay,
}) => {
  const script = document.querySelector('script[data-id="twicpics-script"]')
    .src;

  const [longDomain, ...attributes] = script.split("&");
  const [domain] = longDomain.split("/?v1");

  const params = attributes.reduce((acc, attribute) => {
    const [name, value] = attribute.split("=");
    const numberValue = parseFloat(value);
    acc[name] = isNaN(numberValue) ? value : numberValue;
    return acc;
  }, {});

  const twicClass = params ? (params.class ? params.class : "twic") : "twic";

  const twic = {
    [`data-${twicClass}-src`]: `image:${src}`,
    [`data-${twicClass}-src-focus`]: focus,
    [`data-${twicClass}-src-step`]: step,
  };

  const apiRatio = () => {
    if (ratio) {
      return ratio.replace("/", ":");
    } else if (width && height) {
      return `${width}:${height}`;
    } else {
      return "1:1";
    }
  };

  const apiOutput = placeholder !== "none" ? placeholder : false;

  const paddingRatio = () => {
    let r = [];
    if (ratio) {
      r = ratio.split("/");
    } else if (width && height) {
      r.push(width || 1);
      r.push(height || 1);
    }
    if (r.length > 0) {
      return Number.parseFloat((r[1] / r[0]) * 100).toFixed(2);
    } else {
      return null;
    }
  };

  const bgStyle = () => {
    const styles = {};
    if (paddingRatio()) {
      styles.paddingTop = `${paddingRatio()}%`;
    }
    if (apiOutput) {
      let params = [];
      if (focus) {
        params.push({ k: "focus", v: focus });
      }
      if (apiRatio()) {
        params.push({ k: "cover", v: apiRatio() });
      }
      if (apiOutput) {
        params.push({ k: "output", v: apiOutput });
      }
      const apiParams = params.map((item) => `${item.k}=${item.v}`).join("/");
      // Add a slash if needed.
      const path = /^\//.test(src) ? domain + src : `${domain}/${src}`;
      styles.backgroundImage = `url(${path}?twic=v1/${apiParams})`;
    }
    return styles;
  };

  const imgStyle = transition
    ? {
        transitionDuration,
        transitionTimingFunction,
        transitionDelay,
      }
    : {};

  return (
    <div
      className={`twic-img ${transition ? "twic-img--fade" : ""}`}
      style={bgStyle()}
    >
      <img
        style={imgStyle}
        alt={
          alt === undefined
            ? src.split(/[?#]/).shift().split("/").pop().split(".").shift()
            : alt
        }
        src={`${domain}/v1/cover=${apiRatio()}/placeholder:transparent`}
        width={width || undefined}
        height={height || undefined}
        {...twic}
      />
    </div>
  );
};

TwicImg.defaultProps = {
  alt: undefined,
  placeholder: "preview",
  width: undefined,
  height: undefined,
  ratio: "",
  focus: "",
  step: 10,
  transition: true,
  transitionDuration: "400ms",
  transitionTimingFunction: "ease",
  transitionDelay: "0ms",
};

TwicImg.propTypes = {
  src: PropTypes.string.isRequired,
  alt: PropTypes.string,
  placeholder: PropTypes.oneOf(["preview", "meancolor", "maincolor", "none"]),
  width: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  height: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  ratio: PropTypes.string,
  focus: PropTypes.string,
  step: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  transition: PropTypes.bool,
  transitionDuration: PropTypes.string,
  transitionTimingFunction: PropTypes.string,
  transitionDelay: PropTypes.string,
};

export default TwicImg;
