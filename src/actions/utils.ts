export type Error<T> = { [P in keyof T]?: string };

export type FormikSetErrors<T> = (errors: Error<T>) => void;

export interface FormikPayload<D> {
  data: D;
  setErrors: FormikSetErrors<D>;
}

export interface FormikTokenPayload<P> extends FormikPayload<P> {
  token: string;
}
