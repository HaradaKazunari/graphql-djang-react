import * as React from "react";
import { TrashIcon } from "@heroicons/react/24/solid";
import {
  InputField,
  SelectField,
  Combobox,
  ComboboxInput,
  ComboboxOptions,
  ComboboxOption,
  FormField,
} from "@/components/Form";

import { formatVersatilityOption } from "@/utils/options";
import { useVersatilitys } from "@/features/versatility";
import { getAmountPrice } from "../../helper";
import {
  FieldValues,
  UseFormWatch,
  UseFieldArrayUpdate,
  ArrayPath,
  FieldArray,
  Control,
  Path,
} from "react-hook-form";
import { ProjectDetail, useProjectDetails } from "../..";

export type FormProps<T extends FieldValues> = {
  control: Control<T>;
  watch: UseFormWatch<T>;
};

type Props<T extends FieldValues> = FormProps<T> & {
  fields: FieldValues;
  onRemove: (i: number) => void;
  update: UseFieldArrayUpdate<T, ArrayPath<T>>;
};

export const Form = <T extends FieldValues>({
  fields,
  watch,
  control,
  onRemove,
  update,
}: Props<T>) => {
  const projectDetailQuery = useProjectDetails();
  const [focusIndex, setFocusIndex] = React.useState(-1);

  const getDetailById = (id?: string): ProjectDetail | null => {
    if (!projectDetailQuery.data || !id) return null;
    return projectDetailQuery.data.find((d) => d.id === id) || null;
  };

  // @ts-ignore
  const watchProjectDetail = watch("project_detail");

  const versatilityQuery = useVersatilitys({
    params: {
      identify_code: "UNIT",
    },
  });

  const getSuggestOptions = ({
    product_name = "",
    model_name = "",
  }: ProjectDetail): ProjectDetail[] => {
    if (!product_name) return [];

    return (
      projectDetailQuery.data
        ?.filter((d) => d.product_name.includes(product_name))
        .filter((d) =>
          model_name && d.model_name ? d.model_name.includes(model_name) : true
        ) || []
    );
  };

  return (
    <>
      <div className="grid grid-cols-11 gap-4 mt-4">
        <div className="col-span-2 w-full text-center">製品名</div>
        <div className="col-span-2 w-full text-center">型番</div>
        <div className="w-full text-center">数量</div>
        <div className="w-full text-center">単位</div>
        <div className="w-full text-center">単価</div>
        <div className="w-full text-center">金額</div>
        <div className="col-span-2 w-full text-center">備考</div>
        <div className="opacity-0">削除</div>
      </div>
      <div className="flex flex-col gap-2">
        {fields.map((field: ProjectDetail, i: number) => {
          const keys = Object.keys(field);
          return (
            <div key={i + keys.join("")}>
              <Combobox
                value={field}
                onChange={(selected: ProjectDetail) => {
                  const detail = getDetailById(selected.id);
                  if (selected && detail) {
                    update(i, detail as FieldArray<T, ArrayPath<T>>);
                  }
                  setFocusIndex(-1);
                }}
              >
                <div
                  className="grid grid-cols-11 gap-4"
                  key={i + keys.join("")}
                >
                  <div className="col-span-2">
                    <FormField
                      control={control}
                      name={`project_detail.${i}.product_name` as Path<T>}
                      render={({ field: inputField }) => (
                        <ComboboxInput
                          displayValue={(detail: ProjectDetail) =>
                            detail.product_name
                          }
                          {...inputField}
                          onChange={(
                            e: React.ChangeEvent<HTMLInputElement>
                          ) => {
                            inputField.onChange(e);
                            update(i, {
                              ...field,
                              product_name: e.target.value,
                            } as FieldArray<T, ArrayPath<T>>);
                          }}
                          onFocus={() => setFocusIndex(i)}
                        />
                      )}
                    />
                  </div>
                  <div className="col-span-2">
                    <FormField
                      control={control}
                      name={`project_detail.${i}.model_name` as Path<T>}
                      render={({ field: inputField }) => (
                        <ComboboxInput
                          className="col-span-2"
                          displayValue={(detail: ProjectDetail) =>
                            detail.model_name
                          }
                          {...inputField}
                          onChange={(
                            e: React.ChangeEvent<HTMLInputElement>
                          ) => {
                            inputField.onChange(e);
                            update(i, {
                              ...field,
                              model_name: e.target.value,
                            } as FieldArray<T, ArrayPath<T>>);
                          }}
                          onFocus={() => setFocusIndex(i)}
                        />
                      )}
                    />
                  </div>

                  <FormField
                    control={control}
                    name={`project_detail.${i}.amount` as Path<T>}
                    render={({ field }) => (
                      <InputField type="number" {...field} />
                    )}
                  />
                  <FormField
                    control={control}
                    name={`project_detail.${i}.amount_unit` as Path<T>}
                    render={({ field: inputField }) => (
                      <SelectField
                        className="pr-2 w-full"
                        options={formatVersatilityOption(versatilityQuery)}
                        placeholder="単位"
                        {...inputField}
                      />
                    )}
                  />

                  <FormField
                    control={control}
                    name={`project_detail.${i}.unit_price` as Path<T>}
                    render={({ field }) => (
                      <InputField type="number" {...field} />
                    )}
                  />
                  <div className="flex justify-center items-center">
                    {getAmountPrice(watchProjectDetail[i])}
                  </div>
                  <div className="col-span-2">
                    <FormField
                      control={control}
                      name={`project_detail.${i}.remarks` as Path<T>}
                      render={({ field }) => <InputField {...field} />}
                    />
                  </div>

                  <div
                    className="cursor-pointer flex justify-center items-center"
                    onClick={() => onRemove(i)}
                    role="delete"
                  >
                    <TrashIcon className="size-6 text-gray-500" />
                  </div>
                </div>
                {getSuggestOptions(field).length > 0 && focusIndex === i && (
                  <ComboboxOptions onClose={() => setFocusIndex(-1)}>
                    <ComboboxOption<ProjectDetail> value={field}>
                      <div className="grid grid-cols-8 gap-4">
                        <span>{field.product_name}</span>
                        <span>{field.model_name}</span>
                      </div>
                    </ComboboxOption>
                    {getSuggestOptions(field).map((suggest) => (
                      <ComboboxOption<ProjectDetail>
                        key={suggest.id}
                        value={suggest}
                        className="cursor-pointer hover:bg-gray-100"
                      >
                        <div className="grid grid-cols-8 gap-4">
                          <span>{suggest.product_name}</span>
                          <span>{suggest.model_name}</span>
                        </div>
                      </ComboboxOption>
                    ))}
                  </ComboboxOptions>
                )}
              </Combobox>
            </div>
          );
        })}
      </div>
    </>
  );
};
