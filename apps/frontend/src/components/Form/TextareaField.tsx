import clsx from "clsx";
import { Textarea, TextareaProps } from "@ui/textarea";

import { FieldWrapper, FieldWrapperPassThroughProps } from "./FieldWrapper";

type TextAreaFieldProps = FieldWrapperPassThroughProps & {
  className?: string;
} & TextareaProps;

export const TextareaField = (props: TextAreaFieldProps) => {
  const { label, className, ...inputProps } = props;
  return (
    <FieldWrapper label={label}>
      <Textarea className={clsx(className)} {...inputProps} />
    </FieldWrapper>
  );
};
