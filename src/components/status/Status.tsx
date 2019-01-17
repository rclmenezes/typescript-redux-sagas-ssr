import React from "react";
import { Route } from "react-router-dom";

import { PageRoutingProps } from "../../utils/routing";

interface StatusProps {
  code: number;
}

const Status: React.SFC<StatusProps> = ({ code, children }) => (
  <Route
    render={({ staticContext }: PageRoutingProps<any>) => {
      if (staticContext) {
        staticContext.status = code;
      }
      return children;
    }}
  />
);

export default Status;
