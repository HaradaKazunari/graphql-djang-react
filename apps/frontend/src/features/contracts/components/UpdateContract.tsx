import { Form, FormDrawer, InputField } from "@/components/Form";
import { Authorization, ROLES } from "@/lib/authorization";

import { Button } from "@/components/Elements";

import { useContract } from "../api/getContract";
import { UpdateContractDTO, useUpdateContract } from "../api";

import { getValidateRule } from "@/utils/validate";

type UpdateContractProps = {
  contract_id?: string;
  disabled?: boolean;
};

const schema = getValidateRule([
  "delivery_schedule_date",
  "invoice_schedule_date",
  "order_no",
]);

export const UpdateContract = ({
  contract_id = "",
  disabled = false,
}: UpdateContractProps) => {
  const contractQuery = useContract({ contract_id });
  const updateMutation = useUpdateContract();

  return (
    <Authorization allowedRoles={[ROLES.ADMIN]}>
      <FormDrawer
        isDone={updateMutation.isSuccess}
        triggerButton={
          <Button size="sm" disabled={disabled}>
            編集
          </Button>
        }
        title="受注情報 編集"
        submitButton={
          <Button
            form="update-contract"
            type="submit"
            size="sm"
            isLoading={updateMutation.isPending}
          >
            確定
          </Button>
        }
      >
        <Form<UpdateContractDTO["data"], typeof schema>
          id="update-contract"
          onSubmit={(values) => {
            if (contractQuery.data?.contract_id) {
              updateMutation.mutate({
                data: values,
                contract_id: contractQuery.data?.contract_id,
                project_id: contractQuery.data?.project,
              });
            }
          }}
          options={{
            defaultValues: {
              delivery_schedule_date:
                contractQuery.data?.delivery_schedule_date,
              invoice_schedule_date: contractQuery.data?.invoice_schedule_date,
              order_no: contractQuery.data?.order_no,
            },
          }}
          schema={schema}
        >
          {({ register, formState }) => (
            <>
              <div className="grid grid-cols-2 gap-8">
                <InputField
                  label="納品予定日"
                  error={formState.errors["delivery_schedule_date"]}
                  registration={register("delivery_schedule_date")}
                  type="date"
                  max="9999-12-31"
                />
                <InputField
                  label="請求予定日"
                  error={formState.errors["invoice_schedule_date"]}
                  registration={register("invoice_schedule_date")}
                  type="date"
                  max="9999-12-31"
                />
                <InputField
                  label="注番"
                  error={formState.errors["order_no"]}
                  registration={register("order_no")}
                />
              </div>
            </>
          )}
        </Form>
      </FormDrawer>
    </Authorization>
  );
};
