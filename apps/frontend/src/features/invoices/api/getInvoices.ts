import { useQuery } from "@tanstack/react-query";

import { axios } from "@/lib/axios";
import { ExtractFnReturnType, QueryConfig } from "@/lib/react-query";

import { Invoice } from "../types";

export const getInvoices = ({ params = {} }): Promise<Invoice[]> => {
  return axios.get("/invoice/", { params });
};

type QueryFnType = typeof getInvoices;

type UseInvoicesOptions = {
  params?: any;
  config?: QueryConfig<QueryFnType>;
};

export const useInvoices = ({ params, config }: UseInvoicesOptions = {}) => {
  return useQuery<ExtractFnReturnType<QueryFnType>>({
    ...config,
    queryKey: ["invoices"],
    queryFn: () => getInvoices({ params }),
  });
};
