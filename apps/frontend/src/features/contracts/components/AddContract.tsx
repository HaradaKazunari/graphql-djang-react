import { Form, FormDrawer, InputField } from "@/components/Form";
import { Authorization, ROLES } from "@/lib/authorization";

import { Button } from "@/components/Elements";

import { AddContractDTO, useAddContract } from "../api";

import { getValidateRule } from "@/utils/validate";

type AddContractProps = {
  project_id: string;
};

const schema = getValidateRule([
  "delivery_schedule_date",
  "invoice_schedule_date",
  "order_no",
]);

export const AddContract = ({ project_id }: AddContractProps) => {
  const addMutation = useAddContract();

  return (
    <Authorization allowedRoles={[ROLES.ADMIN]}>
      <FormDrawer
        isDone={addMutation.isSuccess}
        triggerButton={<Button size="sm">登録</Button>}
        title="受注情報 登録"
        submitButton={
          <Button
            form="add-contract"
            type="submit"
            size="sm"
            isLoading={addMutation.isPending}
          >
            確定
          </Button>
        }
      >
        <Form<AddContractDTO["data"], typeof schema>
          id="add-contract"
          onSubmit={(values) => {
            if (project_id) {
              addMutation.mutate({
                data: values,
                project_id,
              });
            }
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
