import React from "react";
import { RouteComponentProps, StaticRouterContext } from "react-router";
import { Route } from "react-router-dom";

interface StatusProps {
  code: number;
}

interface Context extends StaticRouterContext {
  status?: number;
}

const Status: React.SFC<StatusProps> = ({ code, children }) => (
  <Route
    render={({ staticContext }: RouteComponentProps<any, Context, any>) => {
      if (staticContext) {
        staticContext.status = code;
      }
      return children;
    }}
  />
);

export default Status;
