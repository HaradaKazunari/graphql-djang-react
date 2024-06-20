import * as React from "react";
import {
  ArrayPath,
  FieldValues,
  useFieldArray,
  FieldArray,
} from "react-hook-form";
import { Button } from "@/components/Elements";
import { PlusIcon } from "@heroicons/react/24/solid";
import { Form, FormProps } from "./view";

export const projectDetailDefaultValue = {
  product_name: "",
  model_name: "",
  amount: null,
  amount_unit: "",
  unit_price: null,
  remarks: "",
};

export const ProjectDetailsForm = <T extends FieldValues>({
  control,
  ...props
}: FormProps<T>) => {
  const { fields, append, remove, update } = useFieldArray<T, ArrayPath<T>>({
    name: "project_detail" as ArrayPath<T>,
    control,
  });

  React.useEffect(() => {
    remove(0);
  }, [remove]);

  const onRemove = (i: number) => {
    remove(i);
  };

  return (
    <div>
      <Form<T>
        {...props}
        control={control}
        fields={fields}
        onRemove={onRemove}
        update={update}
      />

      <div className="flex justify-center mt-4">
        <Button
          type="button"
          className="w-fit"
          onClick={() =>
            append(projectDetailDefaultValue as FieldArray<T, ArrayPath<T>>)
          }
        >
          <PlusIcon className="text-white w-4 h-4" />
        </Button>
      </div>
    </div>
  );
};
