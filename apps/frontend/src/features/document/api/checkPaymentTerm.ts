import { axios } from "@/lib/axios";
import { useQuery } from "@tanstack/react-query";
import { ExtractFnReturnType, QueryConfig } from "@/lib/react-query";
import { PaymentTerm } from "../type";

const getPaymentTerm = async (params: {
  client_id: string;
  invoice_ym: string;
}): Promise<PaymentTerm> => {
  return axios.get("/invoice/payment-term/", {
    params,
  });
};

type QueryFnType = typeof getPaymentTerm;

type UsePaymentTermOptions = {
  config?: QueryConfig<QueryFnType>;
  client_id: string;
  invoice_ym: string;
};

export const usePaymentTerm = ({
  client_id,
  invoice_ym,
  config = {},
}: UsePaymentTermOptions) => {
  return useQuery<ExtractFnReturnType<QueryFnType>>({
    ...config,
    queryKey: ["payment-term", client_id, invoice_ym],
    queryFn: () => getPaymentTerm({ client_id, invoice_ym }),
  });
};
