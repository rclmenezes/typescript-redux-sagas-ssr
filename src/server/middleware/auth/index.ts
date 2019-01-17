import passport from "passport";

import User from "../../db/models/User";
import jwtBearerTokenStrategy from "./jwtBearerToken";
import localStrategy from "./local";

const LOCAL = "local";
const JWT_TOKEN = "jwtToken";

passport.use(localStrategy);
passport.use(JWT_TOKEN, jwtBearerTokenStrategy);

passport.serializeUser((user: User, done) => {
  done(null, user.id);
});
passport.deserializeUser(async (id, done) => {
  try {
    const user = await User.findOne({ where: { id } });
    if (!user) {
      return done(null);
    }
    done(null, user);
  } catch (e) {
    done(e);
  }
});

export const loginAuthenticate = passport.authenticate(LOCAL);
export const jwtAuthenticate = passport.authenticate(JWT_TOKEN);
