import * as csstips from "csstips";
import * as React from "react";
import Helmet from "react-helmet";
import { connect } from "react-redux";
import { RouteComponentProps, withRouter } from "react-router";
import { matchPath, Route, Switch } from "react-router-dom";
import { Dispatch } from "redux";
import { cssRule, style } from "typestyle";

import routes, { RouteArgs } from "./routes";
import { DEFAULT_HTML_TITLE } from "./settings";

cssRule("body", {
  fontFamily: "sans-serif",
  margin: 0,
  padding: 0,
});

cssRule("a", {
  $nest: {
    "&:hover": {
      textDecoration: "underline",
    },
  },
});

const verticalRoot = style(csstips.fillParent, csstips.vertical);

interface AppProps extends RouteComponentProps<any> {
  dispatch: Dispatch;
}

class App extends React.Component<AppProps> {
  static dispatchFirstAction(dispatch: Dispatch, url: string): void {
    routes.find(route => {
      const match = matchPath(url, route.routeProps || {});
      if (match && route.action) {
        dispatch(route.action(match.params));
      }
      return !!match;
    });
  }

  private paginate = (routing: RouteComponentProps<any>, routeArgs: RouteArgs) => {
    const fullTitle = `${routeArgs.title} | ${DEFAULT_HTML_TITLE}`;
    const fullDescription = routeArgs.description
      ? `${routeArgs.description} | ${DEFAULT_HTML_TITLE}`
      : DEFAULT_HTML_TITLE;
    const meta = [
      { name: "description", content: fullDescription },
      { name: "viewport", content: "width=device-width" },
    ];
    const Component = routeArgs.component;

    return (
      <div>
        <Helmet title={fullTitle} meta={meta} />
        <Component routing={routing} />
      </div>
    );
  };

  componentWillReceiveProps(nextProps: AppProps) {
    // This only fires when we switch pages, so it does NOT trigger on initial page load.
    // That's fine because it's handled by the server in renderApp/html.tsx
    const navigated = nextProps.location !== this.props.location;
    if (navigated) {
      App.dispatchFirstAction(this.props.dispatch, nextProps.location.pathname);
    }
  }

  render() {
    return (
      <div className={verticalRoot}>
        <Helmet>
          <title>{DEFAULT_HTML_TITLE}</title>
          <meta name="description" content={DEFAULT_HTML_TITLE} />
        </Helmet>

        <Switch>
          {routes.map(route => (
            <Route
              {...route.routeProps}
              render={props => this.paginate(props, route)}
              key={route.title}
            />
          ))}
        </Switch>
      </div>
    );
  }
}

export default withRouter(connect()(App));
