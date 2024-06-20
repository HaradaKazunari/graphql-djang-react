import { PlusIcon } from "@heroicons/react/24/outline";

import { Button } from "@/components/Elements";
import { Form, FormDrawer, InputField, SelectField } from "@/components/Form";

import { CreateClientDTO, useCreateClient } from "../api/createClient";
import { getValidateRule } from "@/utils/validate";
import { useVersatilitys } from "@/features/versatility";
import { formatVersatilityOption } from "@/utils/options";

const schema = getValidateRule([
  "company_name",
  "company_kana",
  "post_code",
  "company_address",
  "invoice_code",
  "bank_name",
  "bank_code",
  "close_classification",
]);

export const CreateClient = ({ onSuccess = () => {} }) => {
  const createClientMutation = useCreateClient();
  const versatilityQuery = useVersatilitys({
    params: {
      identify_code: "CLOSE_CLASSIFICATION",
    },
  });

  return (
    <FormDrawer
      isDone={createClientMutation.isSuccess}
      triggerButton={
        <Button size="sm" startIcon={<PlusIcon className="h-4 w-4" />}>
          取引先登録
        </Button>
      }
      title="取引先登録"
      submitButton={
        <Button
          form="create-client"
          type="submit"
          size="sm"
          isLoading={createClientMutation.isPending}
        >
          登録
        </Button>
      }
    >
      <Form<CreateClientDTO["data"], typeof schema>
        id="create-client"
        onSubmit={(values) => {
          createClientMutation.mutateAsync({ data: values }).then(() => {
            onSuccess();
          });
        }}
        schema={schema}
      >
        {({ register, formState }) => (
          <>
            <div className="grid grid-cols-2 gap-4">
              <InputField
                label="企業名"
                error={formState.errors["company_name"]}
                registration={register("company_name")}
              />
              <InputField
                label="企業名かな"
                error={formState.errors["company_kana"]}
                registration={register("company_kana")}
              />
              <InputField
                label="郵便番号"
                error={formState.errors["post_code"]}
                registration={register("post_code")}
              />
              <InputField
                label="所在地"
                error={formState.errors["company_address"]}
                registration={register("company_address")}
              />
              <InputField
                label="インボイス番号"
                leftAddon="T-"
                error={formState.errors["invoice_code"]}
                registration={register("invoice_code")}
              />
              <InputField
                label="銀行名"
                error={formState.errors["bank_name"]}
                registration={register("bank_name")}
              />
              <InputField
                label="口座番号"
                error={formState.errors["bank_code"]}
                registration={register("bank_code")}
              />
              <SelectField
                label="締め区分"
                error={formState.errors["close_classification"]}
                registration={register("close_classification")}
                options={formatVersatilityOption(versatilityQuery)}
              />
            </div>
          </>
        )}
      </Form>
    </FormDrawer>
  );
};
