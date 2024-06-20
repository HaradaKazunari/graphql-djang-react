import { useQuery } from "@tanstack/react-query";

import { axios } from "@/lib/axios";
import { ExtractFnReturnType, QueryConfig } from "@/lib/react-query";

import { Contract } from "../types";

export const getContract = async ({
  contract_id,
}: {
  contract_id?: string;
}): Promise<Contract | any> => {
  if (!contract_id) return async () => null;
  return axios.get(`/contract/${contract_id}/`);
};

type QueryFnType = typeof getContract;

type UseContractOptions = {
  contract_id?: string;
  config?: QueryConfig<QueryFnType>;
};

export const useContract = ({
  contract_id,
  config = {},
}: UseContractOptions) => {
  return useQuery<ExtractFnReturnType<QueryFnType>>({
    ...config,
    queryKey: ["contract", contract_id],
    queryFn: () => getContract({ contract_id }),
  });
};
