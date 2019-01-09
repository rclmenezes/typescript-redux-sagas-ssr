import React from "react";
import { keyframes, style } from "typestyle";
import logo from "../images/react.svg";

const logoSpinAnimation2 = keyframes({
  from: {
    transform: "rotate(0deg)",
  },
  to: {
    transform: "rotate(360deg)",
  },
});

const fastLogo = style({
  animationDuration: "2s",
  animationIterationCount: "infinite",
  animationName: logoSpinAnimation2,
  animationTimingFunction: "linear",
  height: "80px",
});

export default () => {
  return <img src={logo} className={fastLogo} alt="logo" />;
};
