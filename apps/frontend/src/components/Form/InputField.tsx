import { Ref, forwardRef } from "react";
import { Input, InputProps } from "@ui/input";

import { FieldWrapper, FieldWrapperPassThroughProps } from "./FieldWrapper";

export type InputFieldProps = FieldWrapperPassThroughProps & {
  type?: "text" | "email" | "password" | "date" | "tel" | "month" | "number";
  max?: string | number;
  min?: string | number;
  onFocus?: () => void;
} & InputProps;

export const InputField = forwardRef(
  (props: InputFieldProps, ref: Ref<HTMLInputElement>) => {
    const { type = "text", value, label, leftAddon, ...inputProps } = props;

    const getRange = () => {
      let min, max;
      switch (type) {
        case "date":
          max = "9999-12-31";
          break;

        default:
          break;
      }
      return { min, max };
    };

    return (
      <FieldWrapper label={label} leftAddon={leftAddon}>
        <Input
          ref={ref}
          type={type}
          value={value || ""}
          {...getRange()}
          {...inputProps}
        />
      </FieldWrapper>
    );
  }
);
