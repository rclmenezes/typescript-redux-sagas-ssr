import { ConnectedRouter } from "connected-react-router";
import { createBrowserHistory } from "history";
import React from "react";
import { hydrate } from "react-dom";
import { Provider } from "react-redux";
import { setStylesTarget } from "typestyle";

import App from "./app";
import configureStore from "./store";

export const history = createBrowserHistory();

const store = configureStore(window.__INITIAL_STATE__, history);

hydrate(
  <Provider store={store}>
    <ConnectedRouter history={history}>
      <App />
    </ConnectedRouter>
  </Provider>,
  document.getElementById("app"),
);

setStylesTarget(document.getElementById("rendered-styles") as any);

if (module.hot) {
  module.hot.accept();
}
