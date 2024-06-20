import { Button } from "@/components/Elements";
import { Form, FormDrawer, InputField } from "@/components/Form";
import { Authorization, ROLES } from "@/lib/authorization";

import { useCharge } from "../api/getCharge";
import { UpdateChargeDTO, useUpdateCharge } from "../api/updateCharge";
import { getValidateRule } from "@/utils/validate";

type UpdateChargeProps = {
  charge_id: string;
  onSuccess?: () => void;
};

const schema = getValidateRule(["charge_name", "email"]);

export const UpdateCharge = ({
  charge_id,
  onSuccess = () => {},
}: UpdateChargeProps) => {
  const chargeQuery = useCharge({ charge_id });
  const updateChargeMutation = useUpdateCharge();

  return (
    <Authorization allowedRoles={[ROLES.ADMIN]}>
      <FormDrawer
        isDone={updateChargeMutation.isSuccess}
        triggerButton={<Button size="sm">編集</Button>}
        title="担当者 編集"
        submitButton={
          <Button
            form="update-charge"
            type="submit"
            size="sm"
            isLoading={updateChargeMutation.isPending}
          >
            確定
          </Button>
        }
      >
        <Form<UpdateChargeDTO["data"], typeof schema>
          id="update-charge"
          onSubmit={(values) => {
            updateChargeMutation.mutate({ data: values, charge_id });
            onSuccess();
          }}
          options={{
            defaultValues: {
              charge_name: chargeQuery.data?.charge_name,
              email: chargeQuery.data?.email,
            },
          }}
          schema={schema}
        >
          {({ register, formState }) => (
            <>
              <InputField
                label="担当者"
                error={formState.errors["charge_name"]}
                registration={register("charge_name")}
              />
              <InputField
                label="Eメール"
                error={formState.errors["email"]}
                registration={register("email")}
              />
            </>
          )}
        </Form>
      </FormDrawer>
    </Authorization>
  );
};
