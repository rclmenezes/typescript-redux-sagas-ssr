import bodyParser from "body-parser";
import RedisStore from "connect-redis";
import cookieParser from "cookie-parser";
import express from "express";
import ExpressSession from "express-session";
import passport from "passport";

import { COOKIE_SECRET, REDIS_HOSTNAME, REDIS_PORT, SESSION_SECRET } from "../settings";
import sequelize from "./db/sequelize";
import { jwtAuthenticate, loginAuthenticate } from "./middleware/auth";
import renderApp from "./renderApp";
import * as auth from "./services/auth";
import * as users from "./services/users";
import { wrapAsync } from "./utils/wrapAsync";

sequelize.authenticate().catch(err => {
  console.log("Failed DB authentication:", err);
});

const SessionStore = RedisStore(ExpressSession);

const server = express();
server
  .disable("x-powered-by")
  .use(express.static(process.env.RAZZLE_PUBLIC_DIR as string))
  .use(cookieParser(COOKIE_SECRET))
  .use(bodyParser.json())
  .use(
    ExpressSession({
      resave: false,
      saveUninitialized: false,
      secret: SESSION_SECRET,
      store: new SessionStore({ logErrors: true, host: REDIS_HOSTNAME, port: REDIS_PORT }),
    }),
  )
  .use(passport.initialize())
  .use(passport.session())
  .post("/api/change-password", jwtAuthenticate, wrapAsync(users.changePassword))
  .post("/api/login", loginAuthenticate, wrapAsync(auth.login))
  .post("/api/logout", wrapAsync(auth.logout))
  .post("/api/forgot-password", wrapAsync(auth.forgotPassword))
  .post("/api/sign-up", wrapAsync(users.create))
  .get("/api/user", wrapAsync(users.get))
  .get("*", renderApp);

export default server;
