import express from "express";

import * as apiTest from "./apiTest";
import renderApp from "./renderApp";
import { wrapAsync } from "./utils";

const server = express();
server
  .disable("x-powered-by")
  .use(express.static(process.env.RAZZLE_PUBLIC_DIR as string))
  .get("/api/test", wrapAsync(apiTest.get))
  .get("*", wrapAsync(renderApp));

export default server;
