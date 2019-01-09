export const DEFAULT_HTML_TITLE = "My App";

const DEVELOPMENT = "development";
export const ENV: string = process.env.NODE_ENV || DEVELOPMENT;
export const IS_DEBUG: boolean = ENV === DEVELOPMENT;
export const IS_CLIENT: boolean = typeof window !== "undefined";
export const PORT = process.env.PORT || 3000;
