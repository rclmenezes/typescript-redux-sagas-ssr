import { NextFunction, Request, Response } from "express";

import getInitialState from "./getInitialState";
import renderHtml from "./html";

const clientRenderMiddleware = async (req: Request, res: Response, next: NextFunction) => {
  const initialState = getInitialState(req);
  const html = await renderHtml(req, res, initialState);

  res.send(html);
};

export default clientRenderMiddleware;
