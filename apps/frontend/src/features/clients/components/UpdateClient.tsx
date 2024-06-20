import { Button } from "@/components/Elements";
import { Form, FormDrawer, InputField, SelectField } from "@/components/Form";
import { Authorization, ROLES } from "@/lib/authorization";

import { useClient } from "../api/getClient";
import { UpdateClientDTO, useUpdateClient } from "../api/updateClient";
import { getValidateRule } from "@/utils/validate";
import { useVersatilitys } from "@/features/versatility";
import { formatVersatilityOption } from "@/utils/options";

type UpdateClientProps = {
  client_id: string;
  onSuccess?: () => void;
};

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

export const UpdateClient = ({
  client_id,
  onSuccess = () => {},
}: UpdateClientProps) => {
  const clientQuery = useClient({ client_id });
  const updateClientMutation = useUpdateClient();

  const versatilityQuery = useVersatilitys({
    params: {
      identify_code: "CLOSE_CLASSIFICATION",
    },
  });

  return (
    <Authorization allowedRoles={[ROLES.ADMIN]}>
      <FormDrawer
        isDone={updateClientMutation.isSuccess}
        triggerButton={<Button size="sm">編集</Button>}
        title="取引先 編集"
        submitButton={
          <Button
            form="update-client"
            type="submit"
            size="sm"
            isLoading={updateClientMutation.isPending}
          >
            確定
          </Button>
        }
      >
        <Form<UpdateClientDTO["data"], typeof schema>
          id="update-client"
          onSubmit={(values) => {
            updateClientMutation
              .mutateAsync({ data: values, client_id })
              .then(() => {
                onSuccess();
              });
          }}
          options={{
            defaultValues: {
              company_name: clientQuery.data?.company_name,
              company_kana: clientQuery.data?.company_kana,
              post_code: clientQuery.data?.post_code,
              company_address: clientQuery.data?.company_address,
              invoice_code: clientQuery.data?.invoice_code,
              bank_name: clientQuery.data?.bank_name,
              bank_code: clientQuery.data?.bank_code,
              close_classification: clientQuery.data?.close_classification,
            },
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
    </Authorization>
  );
};
