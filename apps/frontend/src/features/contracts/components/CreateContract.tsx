import { Button, Spinner } from "@/components/Elements";
import { Form, InputField, SelectField, FormField } from "@/components/Form";

import { CreateContractDTO, useCreateContract } from "../api";
import { InputContract } from "../types";

import { getValidateRule } from "@/utils/validate";
import { ProjectDetailsForm } from "@/features/projectDetails";

import { useCharges } from "@/features/charges";
import { useClients } from "@/features/clients";
import { getChargeWithClientCompanyName } from "@/utils/options";

const schema = getValidateRule([
  "project_name",
  "charge_id",
  "delivery_schedule_date",
  "invoice_schedule_date",
  "order_no",
  "project_detail",
]);

type CreateContractProps = {
  onSuccess?: () => void;
};

export const CreateContractForm = ({ onSuccess }: CreateContractProps) => {
  const createContractMutation = useCreateContract();
  const chargesQuery = useCharges();
  const clientsQuery = useClients();

  if (chargesQuery.isPending || clientsQuery.isPending) {
    return (
      <div className="w-full h-48 flex justify-center items-center">
        <Spinner size="lg" />
      </div>
    );
  }

  return (
    <>
      <div className="my-4">
        <h2 className="text-lg font-semibold text-gray-900">受注情報</h2>
      </div>
      <Form<CreateContractDTO["data"], typeof schema>
        id="create-Contract"
        onSubmit={(values) => {
          createContractMutation
            .mutateAsync({
              data: values,
            })
            .then(() => {
              onSuccess && onSuccess();
            });
        }}
        schema={schema}
      >
        {({ control, watch }) => (
          <>
            <div className="flex gap-4">
              <FormField
                control={control}
                name="project_name"
                render={({ field }) => <InputField label="案件名" {...field} />}
              />
              <FormField
                control={control}
                name="charge_id"
                render={({ field }) => (
                  <SelectField
                    label="担当者"
                    placeholder="選択してください"
                    {...field}
                    options={getChargeWithClientCompanyName({
                      clientsQuery,
                      chargesQuery,
                    })}
                  />
                )}
              />
            </div>
            <div className="flex gap-4">
              <FormField
                control={control}
                name="delivery_schedule_date"
                render={({ field }) => (
                  <InputField label="納品予定日" type="date" {...field} />
                )}
              />
              <FormField
                control={control}
                name="invoice_schedule_date"
                render={({ field }) => (
                  <InputField label="請求予定日" type="date" {...field} />
                )}
              />
              <FormField
                control={control}
                name="order_no"
                render={({ field }) => <InputField label="注番" {...field} />}
              />
            </div>
            <div className="my-4">
              <h2 className="text-lg font-semibold text-gray-900">受注明細</h2>
            </div>
            <ProjectDetailsForm<CreateContractDTO["data"]>
              watch={watch}
              control={control}
            />
            <div className="flex justify-center !mt-32">
              <Button
                isLoading={createContractMutation.isPending}
                type="submit"
                className="w-fit"
              >
                登録
              </Button>
            </div>
          </>
        )}
      </Form>
    </>
  );
};
