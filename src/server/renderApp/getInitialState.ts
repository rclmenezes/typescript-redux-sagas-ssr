import { Request } from "express";

import { RootState } from "../../reducers";

function getInitialState(req: Request): RootState {
  return {
    user: null,
  };
}

export default getInitialState;
