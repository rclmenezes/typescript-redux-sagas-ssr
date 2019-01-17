import { AxiosError } from "axios";

export type Error<T> = { [P in keyof T]?: string | undefined };

type FormikSetErrors<T> = (errors: T) => void;

export function setFormikErrorsFromError<T>(error: AxiosError, setErrors: FormikSetErrors<T>) {
  if (error.response && error.response.status === 400 && error.response.data) {
    setErrors(error.response.data);
  }
}
