import React from "react";
import { Link } from "react-router-dom";

import FastLogo from "../components/FastLogo";

class About extends React.Component {
  render() {
    return (
      <div>
        <p>Oh hi mark</p>
        <p>
          <Link to="/">Home</Link>
        </p>
        <FastLogo />
      </div>
    );
  }
}

export default About;
