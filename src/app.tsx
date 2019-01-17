import * as csstips from "csstips";
import { px } from "csx";
import * as React from "react";
import Helmet from "react-helmet";
import { connect } from "react-redux";
import { withRouter } from "react-router";
import { matchPath, Redirect, Route, Switch } from "react-router-dom";
import { Dispatch } from "redux";
import { cssRule, style } from "typestyle";

import Http500 from "./components/status/Http500";
import Navbar from "./containers/Navbar";
import { RootState } from "./reducers";
import { UserState } from "./reducers/user";
import routes, { RouteArgs } from "./routes";
import { DEFAULT_HTML_TITLE } from "./settings";
import { PageRoutingProps } from "./utils/routing";

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
  cursor: "pointer",
});

const verticalRoot = style(csstips.fillParent, csstips.vertical);
const addSpaceBottom = { marginBottom: px(50) };

interface AppProps extends PageRoutingProps<any> {
  dispatch: Dispatch;
  showErrorPage: boolean;
  user: UserState;
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

  private paginate = (routing: PageRoutingProps<any>, routeArgs: RouteArgs) => {
    const fullTitle = `${routeArgs.title} | ${DEFAULT_HTML_TITLE}`;
    const fullDescription = routeArgs.description
      ? `${routeArgs.description} | ${DEFAULT_HTML_TITLE}`
      : DEFAULT_HTML_TITLE;
    const meta = [
      { name: "description", content: fullDescription },
      { name: "viewport", content: "width=device-width" },
    ];

    let Component = null;
    if (this.props.showErrorPage) {
      Component = <Http500 routing={routing} />;
    } else if (routeArgs.PrivateComponent) {
      Component = this.props.user ? (
        <routeArgs.PrivateComponent routing={routing} />
      ) : (
        <Redirect to={`/login?redirect=${routing.location.pathname}`} />
      );
    } else if (routeArgs.PublicComponent) {
      Component = this.props.user ? (
        <Redirect to="/" />
      ) : (
        <routeArgs.PublicComponent routing={routing} />
      );
    } else if (routeArgs.Component) {
      Component = <routeArgs.Component routing={routing} />;
    }

    return (
      <div>
        <Helmet title={fullTitle} meta={meta} />
        <div className={style(csstips.flex, addSpaceBottom)}>
          <Navbar
            hideNavbar={routeArgs.hideNavbar}
            hideLogin={routeArgs.hideLogin}
            routing={routing}
          />
          {Component}
        </div>
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

const mapStateToProps = (state: RootState) => ({
  showErrorPage: state.showErrorPage,
  user: state.user,
});

export default withRouter(connect(mapStateToProps)(App));
