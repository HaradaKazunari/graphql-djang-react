import { ForwardedRef, forwardRef } from "react";
import { UseFormRegisterReturn } from "react-hook-form";

import { FieldWrapper, FieldWrapperPassThroughProps } from "./FieldWrapper";
import { Checkbox, CheckboxProps } from "../Elements/Checkbox";

type CheckboxFieldProps = FieldWrapperPassThroughProps & {
  registration: Partial<UseFormRegisterReturn>;
  value: string | boolean;
} & CheckboxProps;

export const CheckboxField = forwardRef(
  (props: CheckboxFieldProps, ref: ForwardedRef<HTMLInputElement>) => {
    const {
      label,
      size = "md",
      variant = "primary",
      value,
      ...checkboxProps
    } = props;

    return (
      <FieldWrapper label={label}>
        <Checkbox
          size={size}
          variant={variant}
          defaultChecked={!!value}
          {...checkboxProps}
          ref={ref}
        />
      </FieldWrapper>
    );
  }
);
