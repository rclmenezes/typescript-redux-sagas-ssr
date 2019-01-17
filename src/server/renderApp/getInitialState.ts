import { Request } from "express";

import { RootState } from "../../reducers";

function getInitialState(req: Request): Partial<RootState> {
  return {
    user: req.user
      ? {
          email: req.user.email,
          id: req.user.id,
        }
      : null,
  };
}

export default getInitialState;
