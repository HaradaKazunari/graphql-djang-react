import { useQuery } from "@tanstack/react-query";

import { axios } from "@/lib/axios";
import { ExtractFnReturnType, QueryConfig } from "@/lib/react-query";

import { Client } from "../types";

export const getClients = (): Promise<Client[]> => {
  return axios.get(`/client/`);
};

type QueryFnType = typeof getClients;

type UseClientsOptions = {
  config?: QueryConfig<QueryFnType>;
};

export const useClients = ({ config }: UseClientsOptions = {}) => {
  return useQuery<ExtractFnReturnType<QueryFnType>>({
    ...config,
    queryKey: ["clients"],
    queryFn: () => getClients(),
  });
};
