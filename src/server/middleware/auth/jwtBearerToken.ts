import { ExtractJwt, Strategy as JWTStrategy, VerifiedCallback } from "passport-jwt";

import { JWT_SECRET } from "../../../settings";
import User from "../../db/models/User";

export const jwtTokenParams = {
  jwtFromRequest: ExtractJwt.fromExtractors([ExtractJwt.fromAuthHeaderAsBearerToken()]),
  secretOrKey: JWT_SECRET,
};

interface JWTPayload {
  id: number;
  email: string;
}

export async function findUserFromPayload(payload: JWTPayload, done: VerifiedCallback) {
  try {
    const user = await User.findOne({ where: { id: payload.id } });
    if (user) {
      return done(null, user);
    } else {
      return done(new Error("User not found"), null);
    }
  } catch (err) {
    return done(err, null);
  }
}

const jwtBearerTokenStrategy = new JWTStrategy(jwtTokenParams, findUserFromPayload);
export default jwtBearerTokenStrategy;
