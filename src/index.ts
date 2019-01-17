import express from "express";

import { PORT } from "./settings";

// tslint:disable-next-line:no-var-requires
let app = require("./server").default;

if (module.hot) {
  module.hot.accept("./server", () => {
    console.log("🔁  HMR Reloading `./server`...");
    try {
      app = require("./server").default;
      console.log("Accepted changes");
    } catch (error) {
      console.error(error);
    }
  });
  console.info("✅  Server-side HMR Enabled!");
}

export default express()
  .use((req, res) => app.handle(req, res))
  .listen(PORT, (err: Error) => {
    if (err) {
      console.error(err);
      return;
    }
    console.log(`> Started on port ${PORT}`);
  });
