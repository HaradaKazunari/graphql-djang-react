import clsx from "clsx";
import { Spinner } from "@/components/Elements";
import { SHOW_DATE_FORMATE } from "@/config";
import { formatDate } from "@/utils/format";
import { useEstimate } from "../api/getEstimate";
import { Estimate as EstimateType } from "..";

type EstimateProps = {
  estimate_id: string;
  children?: (methods: {
    data: EstimateType | Partial<EstimateType>;
  }) => React.ReactNode;
};
export const EstimateDetail = ({ estimate_id, children }: EstimateProps) => {
  const estimateQuery = useEstimate({ estimate_id });
  if (!estimate_id) {
    if (children) return children({ data: {} });
    return null;
  }

  if (estimateQuery.isPending) {
    return (
      <div className="w-full h-48 flex justify-center items-center">
        <Spinner size="lg" />
      </div>
    );
  }

  if (children)
    return children({ data: { estimate_id, ...estimateQuery.data } });

  return (
    <div className="grid grid-cols-2 gap-4">
      <div className={clsx("block text-sm font-medium text-gray-700")}>
        発生日：
        {formatDate(estimateQuery.data?.accrual_date, SHOW_DATE_FORMATE)}
      </div>
      <div className={clsx("block text-sm font-medium text-gray-700")}>
        発生場所：{estimateQuery.data?.accrual_place}
      </div>
      <div className={clsx("block text-sm font-medium text-gray-700")}>
        納期：{estimateQuery.data?.deadline}
      </div>
      <div className={clsx("block text-sm font-medium text-gray-700")}>
        納入場所：{estimateQuery.data?.delivery_place}
      </div>
      <div className={clsx("block text-sm font-medium text-gray-700")}>
        見積有効期限：{estimateQuery.data?.estimate_validity_period}
      </div>
      <div className={clsx("block text-sm font-medium text-gray-700")}>
        取引条件：{estimateQuery.data?.transaction_condition}
      </div>
    </div>
  );
};
