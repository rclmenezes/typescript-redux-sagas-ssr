import React from "react";
import { Link } from "react-router-dom";
import { keyframes, style } from "typestyle";

import logo from "../images/react.svg";

const logoSpinAnimation = keyframes({
  from: {
    transform: "rotate(0deg)",
  },
  to: {
    transform: "rotate(360deg)",
  },
});

const home = style({
  textAlign: "center",
});

const homeLogo = style({
  animationDuration: "20s",
  animationIterationCount: "infinite",
  animationName: logoSpinAnimation,
  animationTimingFunction: "linear",
  height: "80px",
});

const homeHeader = style({
  backgroundColor: "#222",
  color: "white",
  height: "150px",
  padding: "20px",
});

const homeIntro = style({
  fontSize: "large",
});

const homeResources = style({
  $nest: {
    "&>li": {
      display: "inline-block",
      padding: "1rem",
    },
  },
  listStyle: "none",
});

class Home extends React.Component {
  render() {
    return (
      <div className={home}>
        <div className={homeHeader}>
          <img src={logo} className={homeLogo} alt="logo" />
          <h2>Welcome to Razzle</h2>
        </div>
        <p className={homeIntro}>
          To get started, edit <code>src/App.tsx</code> or <code>src/Home.tsx</code> and save to
          reload.
        </p>
        <p>Api Results: ...</p>
        {/*{this.props.apiResults && <FastLogo />}*/}
        <ul className={homeResources}>
          <li>
            <a href="https://github.com/jaredpalmer/razzle">Docs</a>
          </li>
          <li>
            <a href="https://github.com/jaredpalmer/razzle/issues">Issues</a>
          </li>
          <li>
            <a href="https://palmer.chat">Community Slack</a>
          </li>
          <li>
            <Link to="/about">About</Link>
          </li>
        </ul>
      </div>
    );
  }
}

export default Home;
