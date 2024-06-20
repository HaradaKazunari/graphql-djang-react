import { ValidationMessage, useValidationStore } from "@/stores/validation";
import { zodResolver } from "@hookform/resolvers/zod";
import clsx from "clsx";
import * as React from "react";
import {
  useForm,
  UseFormReturn,
  SubmitHandler,
  UseFormProps,
  FieldValues,
  SubmitErrorHandler,
  Path,
} from "react-hook-form";
import { ZodType, ZodTypeDef } from "zod";
import { Form as UIForm } from "@ui/form";
export * from "@ui/form";

type FormProps<TFormValues extends FieldValues, Schema> = {
  className?: string;
  onSubmit: SubmitHandler<TFormValues>;
  children: (methods: UseFormReturn<TFormValues>) => React.ReactNode;
  options?: UseFormProps<TFormValues>;
  id?: string;
  schema?: Schema;
  debug?: boolean;
};

export const Form = <
  TFormValues extends Record<string, unknown> = Record<string, unknown>,
  Schema extends ZodType<unknown, ZodTypeDef, unknown> = ZodType<
    unknown,
    ZodTypeDef,
    unknown
  >,
>({
  onSubmit,
  children,
  className,
  options,
  id,
  schema,
  debug = false,
}: FormProps<TFormValues, Schema>) => {
  const submitProcessing = React.useRef(false);
  const { validations, clearValidations } = useValidationStore();

  const methods = useForm<TFormValues>({
    ...options,
    resolver: schema && zodResolver(schema),
  });

  React.useEffect(() => {
    validations.map((validate: ValidationMessage) => {
      const key = validate.key as Path<TFormValues>;
      methods.setError(key, validate);
    });
    submitProcessing.current = false;
  }, [validations]);

  const onError: SubmitErrorHandler<TFormValues> = (e) => {
    clearValidations();
    if (debug) console.log(e);
  };

  const onSubmitOverwrite: SubmitHandler<TFormValues> = (e) => {
    clearValidations();
    if (submitProcessing.current) return;
    submitProcessing.current = true;
    onSubmit(e);
  };

  return (
    <UIForm {...methods}>
      <form
        id={id}
        className={clsx("space-y-2", className)}
        onSubmit={methods.handleSubmit(onSubmitOverwrite, onError)}
        noValidate
      >
        {children(methods)}
      </form>
    </UIForm>
  );
};
