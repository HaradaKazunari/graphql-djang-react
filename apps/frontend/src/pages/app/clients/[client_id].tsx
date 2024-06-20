import { useNavigate, useParams } from "react-router-dom";
import clsx from "clsx";
import { Card, Spinner } from "@/components/Elements";
import { ContentLayout } from "@/components/Layout";
import { UpdateClient, useClient } from "@/features/clients";
import { ChargesList } from "@/features/charges/components/ChargesList";
import { CreateCharge } from "@/features/charges/components/CreateCharge";

export const Client = () => {
  const { client_id = "" } = useParams();
  const navigate = useNavigate();
  if (!client_id) navigate("..");

  const clientQuery = useClient({ client_id });

  if (clientQuery.isPending) {
    return (
      <div className="w-full h-48 flex justify-center items-center">
        <Spinner size="lg" />
      </div>
    );
  }

  if (!clientQuery.data) return null;

  return (
    <>
      <ContentLayout title="取引先詳細">
        <div className="text-xl mt-2">
          {clientQuery.data?.company_name}({clientQuery.data?.company_kana})
        </div>
        <div className="mt-6 flex gap-6">
          <Card head="">
            <div className="grid grid-cols-2 gap-4">
              <div className={clsx("block text-sm font-medium text-gray-700")}>
                郵便番号：{clientQuery.data?.post_code}
              </div>
              <div className={clsx("block text-sm font-medium text-gray-700")}>
                所在地：{clientQuery.data?.company_address}
              </div>
              <div className={clsx("block text-sm font-medium text-gray-700")}>
                銀行名：{clientQuery.data?.bank_name}
              </div>
              <div className={clsx("block text-sm font-medium text-gray-700")}>
                口座番号：{clientQuery.data?.bank_code}
              </div>
              <div className={clsx("block text-sm font-medium text-gray-700")}>
                インボイス番号：T-{clientQuery.data?.invoice_code}
              </div>
            </div>
            <div className="flex justify-end">
              <UpdateClient client_id={client_id} />
            </div>
          </Card>
        </div>
        <div className="text-xl mt-6">担当者</div>
        <div className="flex justify-end">
          <CreateCharge client_id={client_id} />
        </div>
        <div className="mt-3">
          <ChargesList client_id={client_id} />
        </div>
      </ContentLayout>
    </>
  );
};
export default Client;
