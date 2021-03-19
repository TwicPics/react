import React, { useContext } from "react";
import PropTypes from "prop-types";
import "./twic.module.css";
import { Context } from "../utils/context";

const TwicImg = ({
  src,
  alt,
  title,
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
  const context = useContext(Context);
  const params = context.params;
  const domain = context.domain;

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
    return Number.parseFloat((r[1] / r[0]) * 100).toFixed(2);
  };

  const bgStyle = () => {
    const styles =
      apiRatio() || paddingRatio() ? { paddingTop: `${paddingRatio()}%` } : "";
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
      styles["backgroundImage"] = `url(${domain}${src}?twic=v1/${apiParams})`;
    }
    return styles;
  };

  const bgStringStyle = bgStyle();

  const imgStyle = transition
    ? {
        transitionDuration,
        transitionTimingFunction,
        transitionDelay,
      }
    : {};

  return (
    <div className="twic-img twic-img--fade" style={bgStringStyle}>
      <img
        style={imgStyle}
        alt={alt}
        title={title}
        src={`${domain}/v1/cover=${apiRatio()}/placeholder:transparent`}
        width={width}
        height={height}
        {...twic}
      />
      <noscript>
        <img
          style={imgStyle}
          alt={alt}
          title={title}
          src={`${domain}${src}?twic=v1/cover=${apiRatio()}/resize=${
            width || 1000
          }`}
          width={width}
          height={height}
          {...twic}
        />
      </noscript>
    </div>
  );
};

TwicImg.defaultProps = {
  alt: "",
  title: "",
  placeholder: "preview",
  width: 0,
  height: 0,
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
  title: PropTypes.string,
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
