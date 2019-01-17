import { px } from "csx";
import { FieldProps } from "formik";
import * as React from "react";
import { Input, InputProps as SemanticUIInputProps, Message } from "semantic-ui-react";
import { style } from "typestyle";

const InputField: React.SFC<FieldProps & SemanticUIInputProps> = ({ field, form, ...props }) => {
  // Avoiding the implicit any type error
  const formTouched: any = form.touched;
  const formError: any = form.errors;
  const fieldStyle = style({ marginBottom: px(15) });

  return (
    <div className={fieldStyle}>
      <Input {...field} {...props} />
      {formTouched[field.name] && formError[field.name] && (
        <Message error>{formError[field.name]}</Message>
      )}
    </div>
  );
};

export default InputField;
