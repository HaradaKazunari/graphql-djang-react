import clsx from "clsx";
import * as React from "react";

import { FieldWrapper, FieldWrapperPassThroughProps } from "./FieldWrapper";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@ui/select";

export type Option = {
  label: React.ReactNode;
  value: string | number | string[];
};

type SelectFieldProps = FieldWrapperPassThroughProps & {
  options: Option[];
  className?: string;
  defaultValue?: string;
  placeholder?: string;
  onBlur?: () => void;
  value?: string;
  onChange: (v: string | number) => void;
};

export const SelectField = React.forwardRef(
  (props: SelectFieldProps, ref: React.LegacyRef<HTMLButtonElement>) => {
    const {
      label,
      options,
      className,
      placeholder,
      onChange,
      value = "",
    } = props;

    return (
      <FieldWrapper label={label}>
        <Select onValueChange={onChange} defaultValue={value}>
          <SelectTrigger className={clsx("gap-2 w-fit", className)} ref={ref}>
            <SelectValue placeholder={placeholder} />
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              {options.map(({ value, label }) => (
                <SelectItem value={value.toString()} key={value.toString()}>
                  {label}
                </SelectItem>
              ))}
            </SelectGroup>
          </SelectContent>
        </Select>
      </FieldWrapper>
    );
  }
);
