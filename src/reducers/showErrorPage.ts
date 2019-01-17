import { Action } from "typescript-fsa";

export function showErrorPage(state: boolean = false, action: Action<any>) {
  if (
    action.type.endsWith("FAILED") &&
    action.payload.error &&
    action.payload.error.response === 500
  ) {
    return true;
  }
  return false;
}
