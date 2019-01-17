import * as bcrypt from "bcryptjs";
import { Strategy as LocalStrategy } from "passport-local";

import User from "../../db/models/User";

const localStrategy = new LocalStrategy(
  {
    passwordField: "password",
    usernameField: "email",
  },
  async (
    email: string,
    password: string,
    done: (error: any, user?: any, options?: any) => void,
  ) => {
    let user;
    try {
      user = await User.findOne({ where: { email } });
    } catch (err) {
      done(err);
    }

    if (!user) {
      return done(null, false);
    }

    const { passwordHash } = user;
    const passwordsMatch = await bcrypt.compare(password, passwordHash);
    if (passwordsMatch) {
      return done(null, user);
    } else {
      return done(null, false);
    }
  },
);

export default localStrategy;
