import { Form, FormDrawer, InputField } from "@/components/Form";
import { Authorization, ROLES } from "@/lib/authorization";

import { Button } from "@/components/Elements";

import { useEstimate } from "../api/getEstimate";
import { UpdateEstimateDTO, useUpdateEstimate } from "../api/updateEstimate";

import { getValidateRule } from "@/utils/validate";

type UpdateEstimateProps = {
  estimate_id?: string;
  disabled?: boolean;
};

const schema = getValidateRule([
  "accrual_date",
  "accrual_place",
  "estimate_validity_period",
  "deadline",
  "delivery_place",
  "transaction_condition",
]);

export const UpdateEstimate = ({
  estimate_id = "",
  disabled = false,
}: UpdateEstimateProps) => {
  const estimateQuery = useEstimate({ estimate_id });
  const updateEstimateMutation = useUpdateEstimate();

  return (
    <Authorization allowedRoles={[ROLES.ADMIN]}>
      <FormDrawer
        isDone={updateEstimateMutation.isSuccess}
        triggerButton={
          <Button size="sm" disabled={disabled}>
            編集
          </Button>
        }
        title="見積情報 編集"
        submitButton={
          <Button
            form="update-estimate"
            type="submit"
            size="sm"
            isLoading={updateEstimateMutation.isPending}
          >
            確定
          </Button>
        }
      >
        <Form<UpdateEstimateDTO["data"], typeof schema>
          id="update-estimate"
          onSubmit={(values) => {
            if (estimateQuery.data?.estimate_id) {
              updateEstimateMutation.mutate({
                data: values,
                estimate_id: estimateQuery.data?.estimate_id,
              });
            }
          }}
          options={{
            defaultValues: {
              accrual_date: estimateQuery.data?.accrual_date,
              accrual_place: estimateQuery.data?.accrual_place,
              deadline: estimateQuery.data?.deadline,
              delivery_place: estimateQuery.data?.delivery_place,
              estimate_validity_period:
                estimateQuery.data?.estimate_validity_period,
              transaction_condition: estimateQuery.data?.transaction_condition,
            },
          }}
          schema={schema}
        >
          {({ register, formState }) => (
            <>
              <div className="grid grid-cols-2 gap-8">
                <InputField
                  label="発生日"
                  type="date"
                  max="9999-12-31"
                  error={formState.errors["accrual_date"]}
                  registration={register("accrual_date")}
                />
                <InputField
                  label="発生場所"
                  error={formState.errors["accrual_place"]}
                  registration={register("accrual_place")}
                />
                <InputField
                  label="納期"
                  error={formState.errors["deadline"]}
                  registration={register("deadline")}
                />
                <InputField
                  label="納入場所"
                  error={formState.errors["delivery_place"]}
                  registration={register("delivery_place")}
                />
                <InputField
                  label="見積有効期限"
                  error={formState.errors["estimate_validity_period"]}
                  registration={register("estimate_validity_period")}
                />
                <InputField
                  label="取引条件"
                  error={formState.errors["transaction_condition"]}
                  registration={register("transaction_condition")}
                />
              </div>
            </>
          )}
        </Form>
      </FormDrawer>
    </Authorization>
  );
};
