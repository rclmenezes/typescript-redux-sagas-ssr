import { Request, Response } from "express";
import { createMemoryHistory } from "history";
import React from "react";
import ReactDOMServer from "react-dom/server";
import Helmet from "react-helmet";
import { Provider } from "react-redux";
import { StaticRouter, StaticRouterContext } from "react-router";
import { END } from "redux-saga";
import { getStyles } from "typestyle";
import * as url from "url";

import App from "../../app";
import { RootState } from "../../reducers";
import configureStore from "../../store";

// tslint:disable-next-line
const assets = require(process.env.RAZZLE_ASSETS_MANIFEST as string);

interface Context extends StaticRouterContext {
  status?: number;
}

const createAppHtml = async (req: Request, res: Response, initialState: Partial<RootState>) => {
  const context: Context = {}; // StaticRouter may change this variable...
  const history = createMemoryHistory();
  const store = configureStore(initialState, history);

  const html = ReactDOMServer.renderToString(
    <Provider store={store}>
      <StaticRouter location={req.url} context={context}>
        <App />
      </StaticRouter>
    </Provider>,
  );

  (App as any).dispatchFirstAction(store.dispatch, url.parse(req.url).pathname as string);

  const saga = (store as any).saga;
  store.dispatch(END);
  await saga.done;
  const state = store.getState();

  // If the page tells us to deliver a non-200
  if (context.status) {
    res.status(context.status);
  }
  return { html, state };
};

const renderHtml = async (req: Request, res: Response, initialState: Partial<RootState>) => {
  const { html, state } = await createAppHtml(req, res, initialState);
  const headAssets = Helmet.renderStatic();

  return `
  <!doctype html>
  <html>
    <head>
      ${headAssets.title.toString()}
      ${headAssets.meta.toString()}
      ${headAssets.link.toString()}
      
      <link rel="stylesheet" href="//cdnjs.cloudflare.com/ajax/libs/semantic-ui/2.4.1/semantic.min.css"></link>
      <style id="styles-target">
        ${getStyles()}
      </style>
      ${
        process.env.NODE_ENV === "production"
          ? `<script src="${assets.client.js}" defer></script>`
          : `<script src="${assets.client.js}" defer crossorigin></script>`
      }
    </head>
    <body>
      <div id="app">${html}</div>
      <script>window.__INITIAL_STATE__ = ${JSON.stringify(state)}</script>
    </body>
  </html>`;
};

export default renderHtml;
