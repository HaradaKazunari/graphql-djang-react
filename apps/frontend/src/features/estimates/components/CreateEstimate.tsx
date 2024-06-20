import { Button, Spinner } from "@/components/Elements";
import {
  Form,
  InputField,
  SelectField,
  FormField,
  TextareaField,
} from "@/components/Form";
import { Authorization, ROLES } from "@/lib/authorization";

import { CreateEstimateDTO, useCreateEstimate } from "../api/createEstimate";

import { getValidateRule } from "@/utils/validate";
import { ProjectDetailsForm } from "@/features/projectDetails";
import { useCharges } from "@/features/charges";
import { useClients } from "@/features/clients";
import { getChargeWithClientCompanyName } from "@/utils/options";

const schema = getValidateRule([
  "project_name",
  "charge_id",
  "accrual_date",
  "accrual_place",
  "estimate_validity_period",
  "deadline",
  "delivery_place",
  "transaction_condition",
  "project_detail",
]);

type CreateEstimateProps = {
  onSuccess: () => void;
};

export const CreateEstimateForm = ({ onSuccess }: CreateEstimateProps) => {
  const createEstimateMutation = useCreateEstimate();

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
    <Authorization allowedRoles={[ROLES.ADMIN]}>
      <div className="my-4">
        <h2 className="text-lg font-semibold text-gray-900">見積情報</h2>
      </div>
      <Form<CreateEstimateDTO["data"], typeof schema>
        id="create-Estimate"
        onSubmit={(values) => {
          createEstimateMutation
            .mutateAsync({
              data: values,
            })
            .then(() => {
              onSuccess();
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
                name="accrual_date"
                render={({ field }) => (
                  <InputField label="発生日" type="date" {...field} />
                )}
              />
              <FormField
                control={control}
                name="accrual_place"
                render={({ field }) => (
                  <InputField label="発生場所" {...field} />
                )}
              />
            </div>
            <FormField
              control={control}
              name="estimate_validity_period"
              render={({ field }) => (
                <InputField
                  label="見積有効期限"
                  className="!w-1/3"
                  {...field}
                />
              )}
            />
            <div className="flex gap-4">
              <FormField
                control={control}
                name="deadline"
                render={({ field }) => <InputField label="納期" {...field} />}
              />
              <FormField
                control={control}
                name="delivery_place"
                render={({ field }) => (
                  <InputField label="納入場所" {...field} />
                )}
              />
            </div>
            <FormField
              control={control}
              name="transaction_condition"
              render={({ field }) => (
                <TextareaField label="取引条件" className="w-1/3" {...field} />
              )}
            />
            <div>
              <div className="mt-12">
                <h2 className="text-lg font-semibold text-gray-900">
                  見積明細
                </h2>
              </div>
              <ProjectDetailsForm<CreateEstimateDTO["data"]>
                watch={watch}
                control={control}
              />
            </div>
            <div className="flex justify-center !mt-32">
              <Button
                isLoading={createEstimateMutation.isPending}
                type="submit"
                className="w-fit"
              >
                登録
              </Button>
            </div>
          </>
        )}
      </Form>
    </Authorization>
  );
};
