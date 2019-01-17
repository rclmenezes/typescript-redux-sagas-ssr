import { RouteComponentProps, StaticRouterContext } from "react-router";

export interface PageContext extends StaticRouterContext {
  status?: number;
}

export type PageRoutingProps<P> = RouteComponentProps<P, PageContext, any>;
