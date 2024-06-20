import clsx from "clsx";
import { Spinner } from "@/components/Elements";
import { SHOW_DATE_FORMATE } from "@/config";
import { formatDate } from "@/utils/format";
import { Contract as ContractType } from "..";
import { useContract } from "../api/getContract";

type ContractProps = {
  contract_id: string;
  children?: (methods: {
    data: ContractType | Partial<ContractType>;
  }) => React.ReactNode;
};
export const ContractDetail = ({ contract_id, children }: ContractProps) => {
  const contractQuery = useContract({ contract_id });

  if (!contract_id) {
    if (children) return children({ data: {} });
    return null;
  }

  if (contractQuery.isPending) {
    return (
      <div className="w-full h-48 flex justify-center items-center">
        <Spinner size="lg" />
      </div>
    );
  }

  if (children)
    return children({ data: { contract_id, ...contractQuery.data } });

  return (
    <div className="grid grid-cols-2 gap-4">
      <div className={clsx("block text-sm font-medium text-gray-700")}>
        納品予定日：
        {formatDate(
          contractQuery.data?.delivery_schedule_date,
          SHOW_DATE_FORMATE,
        )}
      </div>
      <div className={clsx("block text-sm font-medium text-gray-700")}>
        請求予定日：
        {formatDate(
          contractQuery.data?.invoice_schedule_date,
          SHOW_DATE_FORMATE,
        )}
      </div>
      <div className={clsx("block text-sm font-medium text-gray-700")}>
        納品日：
        {formatDate(
          contractQuery.data?.delivery_issued_date,
          SHOW_DATE_FORMATE,
        )}
      </div>
      <div className={clsx("block text-sm font-medium text-gray-700")}>
        請求日：
        {formatDate(contractQuery.data?.invoice_issued_date, SHOW_DATE_FORMATE)}
      </div>
      <div className={clsx("block text-sm font-medium text-gray-700")}>
        注番：{contractQuery.data?.order_no}
      </div>
    </div>
  );
};
