import { PlusIcon } from "@heroicons/react/24/outline";

import { Button } from "@/components/Elements";
import { FormDrawer, Form, InputField, FormField } from "@/components/Form";

import { CreateChargeDTO, useCreateCharge } from "../api/createCharge";
import { getValidateRule } from "@/utils/validate";

const schema = getValidateRule(["charge_name", "email"]);

type CreateChargeType = {
  client_id: string;
  onSuccess?: () => void;
};
export const CreateCharge = ({
  client_id,
  onSuccess = () => {},
}: CreateChargeType) => {
  const createChargeMutation = useCreateCharge();

  return (
    <FormDrawer
      isDone={createChargeMutation.isSuccess}
      triggerButton={
        <Button size="sm" startIcon={<PlusIcon className="h-4 w-4" />}>
          担当者登録
        </Button>
      }
      title="担当者 登録"
      submitButton={
        <Button
          form="create-charge"
          type="submit"
          size="sm"
          isLoading={createChargeMutation.isPending}
        >
          登録
        </Button>
      }
    >
      <Form<CreateChargeDTO["data"], typeof schema>
        id="create-charge"
        onSubmit={(values) => {
          createChargeMutation
            .mutateAsync({
              data: { ...values, client: client_id },
            })
            .then(() => {
              onSuccess();
            });
        }}
        schema={schema}
      >
        {({ control }) => (
          <>
            <FormField
              control={control}
              name="charge_name"
              render={({ field }) => <InputField label="担当者" {...field} />}
            />
            <FormField
              control={control}
              name="email"
              render={({ field }) => <InputField label="Eメール" {...field} />}
            />
          </>
        )}
      </Form>
    </FormDrawer>
  );
};
