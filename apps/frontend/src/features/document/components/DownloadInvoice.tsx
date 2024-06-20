import { Button } from "@/components/Elements";
import { Authorization, ROLES } from "@/lib/authorization";
import { FormDialog, Form, InputField } from "@/components/Form";
import { getValidateRule } from "@/utils/validate";

import { useDownloadInvoice, DownloadInvoiceDTO, usePaymentTerm } from "../api";

type DownloadInvoiceProps = {
  client_id: string;
  invoice_ym: string;
};

const schema = getValidateRule(["payment_term"]);

export const DownloadInvoice = ({
  client_id,
  invoice_ym,
}: DownloadInvoiceProps) => {
  const paymentTermQuery = usePaymentTerm({ client_id, invoice_ym });
  const downloadInvoiceMutate = useDownloadInvoice();

  return (
    <Authorization allowedRoles={[ROLES.ADMIN]}>
      <FormDialog
        isDone={downloadInvoiceMutate.isPending}
        title="請求書ダウンロード"
        triggerButton={
          <Button size="sm" variant="primary">
            請求書
            <br />
            ダウンロード
          </Button>
        }
        submitButton={
          <Button
            isLoading={downloadInvoiceMutate.isPending}
            type="submit"
            variant="primary"
            form="issue-invoice"
          >
            ダウンロード
          </Button>
        }
      >
        <Form<DownloadInvoiceDTO["data"], typeof schema>
          id="issue-invoice"
          onSubmit={(values) => {
            downloadInvoiceMutate.mutate({
              data: { ...values },
              client_id,
              invoice_ym,
            });
          }}
          schema={schema}
          options={{
            defaultValues: {
              payment_term: paymentTermQuery.data?.payment_term,
            },
          }}
        >
          {({ register, formState }) => (
            <>
              <div className="grid grid-cols-2 gap-4">
                <InputField
                  label="支払い条件"
                  error={formState.errors["payment_term"]}
                  registration={register("payment_term")}
                />
              </div>
            </>
          )}
        </Form>
      </FormDialog>
    </Authorization>
  );
};
