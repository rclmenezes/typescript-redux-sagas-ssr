import { NextFunction, Request, Response } from "express";
// import sequelize from "../db/sequelize";

// export function wrapAsync<T>(fn: (req: Request, res: Response) => Promise<T>) {
//   return (req: Request, res: Response, next: NextFunction) => {
//     sequelize
//       .transaction(t => {
//         return fn(req, res);
//       })
//       .catch(next);
//   };
// }

export function wrapAsync<T>(fn: (req: Request, res: Response, next: NextFunction) => Promise<T>) {
  return (req: Request, res: Response, next: NextFunction) => {
    Promise.resolve(fn(req, res, next)).catch(next);
  };
}
