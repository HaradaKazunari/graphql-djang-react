import { ElementType, ForwardedRef, ReactNode, Ref, forwardRef } from "react";
import {
  Combobox,
  ComboboxInputProps,
  ComboboxOptionProps,
} from "@headlessui/react";
import { XMarkIcon } from "@heroicons/react/24/outline";

import { InputField, InputFieldProps } from ".";
import { Card, CardContent, CardHeader } from "../Elements";

export { Combobox };

export const ComboboxInputRef = <T,>(
  props: ComboboxInputProps<ElementType, T> & InputFieldProps,
  ref: ForwardedRef<HTMLInputElement>
) => {
  return <Combobox.Input {...props} as={InputField} ref={ref} />;
};
export const ComboboxInput = forwardRef(ComboboxInputRef);

type OptionsType = {
  onClose: () => void;
  children: ReactNode;
};
const Options = forwardRef(
  (
    { onClose, children, ...props }: OptionsType,
    ref: ForwardedRef<HTMLUListElement>
  ) => {
    return (
      <Card className="relative mt-2" {...props}>
        <div
          className="p-2 cursor-pointer absolute top-1 right-4"
          onClick={onClose}
        >
          <XMarkIcon className="size-6" />
        </div>
        <CardHeader />
        <CardContent>
          <ul ref={ref}>{children}</ul>
        </CardContent>
      </Card>
    );
  }
);

export const ComboboxOptions = (props: OptionsType) => {
  return <Combobox.Options as={Options} {...props} />;
};

export const ComboboxOption = <T,>(
  props: ComboboxOptionProps<ElementType, T>
) => {
  return (
    <Combobox.Option className="cursor-pointer hover:bg-gray-100" {...props} />
  );
};
