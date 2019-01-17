export const DEVELOPMENT = "development";
export const PRODUCTION = "production";
export const ENV: string = process.env.NODE_ENV || DEVELOPMENT;
export const IS_CLIENT: boolean = typeof window !== "undefined";
export const IS_PRODUCTION = ENV === PRODUCTION;
export const PORT = process.env.PORT || 3000;

export const BASE_URL = IS_PRODUCTION ? "yourapp.com" : `localhost:${PORT}`;
export const DEFAULT_HTML_TITLE = "My App";

export const POSTGRES_DB = process.env.POSTGRES_DB || "postgres";
export const POSTGRES_HOSTNAME = process.env.POSTGRES_HOSTNAME || "0.0.0.0";
export const POSTGRES_USER = "webserver";
export const POSTGRES_PASSWORD = "password";

export const REDIS_HOSTNAME = process.env.REDIS_HOSTNAME || "0.0.0.0";
export const REDIS_PORT = (process.env.REDIS_PORT || 6379) as number;

export const COOKIE_SECRET = process.env.COOKIE_SECRET || "pizza cat";
export const JWT_SECRET = process.env.JWT_SECRET || "pizza cat";
export const SESSION_SECRET = process.env.SESSION_SECRET || "pizza cat";
export const SENDGRID_API_KEY = process.env.SENDGRID_API_KEY;
