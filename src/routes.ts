import { match, RouteProps } from "react-router";
import { ActionCreator } from "typescript-fsa";

import actionCreators from "./actions";
import About from "./components/About";
import Home from "./components/Home";
import Http404 from "./components/Http404";

export interface RouteArgs {
  action?: ActionCreator<any>;
  component: React.ComponentType<any>;
  description?: string;
  routeProps?: RouteProps;
  title: string;
}

const routes: RouteArgs[] = [
  {
    action: actionCreators.apiTest.started,
    component: Home,
    routeProps: {
      exact: true,
      path: "/",
    },
    title: "Home",
  },
  {
    action: actionCreators.apiTest.started,
    component: About,
    routeProps: {
      exact: true,
      path: "/about",
    },
    title: "About",
  },
  {
    component: Http404,
    description: "Sorry, your page was not found",
    title: "404 Not Found",
  },
];

export default routes;
