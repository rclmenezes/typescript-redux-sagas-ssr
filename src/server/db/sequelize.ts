import * as cls from "cls-hooked";
import { Sequelize } from "sequelize-typescript";

import { POSTGRES_DB, POSTGRES_HOSTNAME, POSTGRES_PASSWORD, POSTGRES_USER } from "../../settings";
import User from "./models/User";

export const namespace = cls.createNamespace("sequelize-transaction");

// Add transactions to everything!
// https://github.com/RobinBuschmann/sequelize-typescript/issues/58
(Sequelize as any).__proto__.useCLS(namespace as any);

let sequelize: Sequelize;
const DB_URL = process.env.DATABASE_URL;

if (DB_URL) {
  // tslint:disable-next-line
  console.log(`Found DB url. Connecting to ${DB_URL}`);
  sequelize = new Sequelize(DB_URL);
} else {
  sequelize = new Sequelize({
    database: POSTGRES_DB,
    dialect: "postgres",
    host: POSTGRES_HOSTNAME,
    operatorsAliases: false,
    password: POSTGRES_PASSWORD,
    username: POSTGRES_USER,
  });
}

sequelize.addModels([User]);

export default sequelize;
