import { useQuery } from "@tanstack/react-query";

import { axios } from "@/lib/axios";
import { ExtractFnReturnType, QueryConfig } from "@/lib/react-query";

import { Invoice } from "../types";

export const getInvoice = ({
  client_id,
  invoice_ym,
}: {
  client_id: string;
  invoice_ym: string;
}): Promise<Invoice> => {
  return axios.get(`/invoice/${client_id}/`, {
    params: { invoice_ym },
  });
};

type QueryFnType = typeof getInvoice;

type UseInvoiceOptions = {
  client_id: string;
  invoice_ym: string;
  config?: QueryConfig<QueryFnType>;
};

export const useInvoice = ({
  client_id,
  invoice_ym,
  config,
}: UseInvoiceOptions) => {
  return useQuery<ExtractFnReturnType<QueryFnType>>({
    ...config,
    queryKey: ["invoice", client_id, invoice_ym],
    queryFn: () => getInvoice({ client_id, invoice_ym }),
  });
};
