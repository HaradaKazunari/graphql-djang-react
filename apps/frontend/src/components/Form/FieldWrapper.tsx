import * as React from "react";
import { FieldError } from "react-hook-form";
import { FormControl, FormItem, FormLabel, FormMessage } from "../ui/form";

type FieldWrapperProps = {
  label?: string;
  className?: string;
  children: React.ReactNode;
  error?: FieldError | undefined;
  description?: string;
  leftAddon?: React.ReactNode;
};

export type FieldWrapperPassThroughProps = Omit<
  FieldWrapperProps,
  "className" | "children"
>;

export const FieldWrapper = (props: FieldWrapperProps) => {
  const { label, leftAddon, children } = props;
  return (
    <FormItem>
      <FormLabel className="text-sm font-medium text-gray-700">
        {label}
      </FormLabel>
      <FormControl>
        <div className="flex items-center">
          {leftAddon && <div>{leftAddon}</div>}
          {children}
        </div>
      </FormControl>
      <FormMessage />
    </FormItem>
  );
};
