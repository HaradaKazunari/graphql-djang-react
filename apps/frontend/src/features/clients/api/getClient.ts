import { useQuery } from "@tanstack/react-query";

import { axios } from "@/lib/axios";
import { ExtractFnReturnType, QueryConfig } from "@/lib/react-query";

import { Client } from "../types";

export const getClient = ({
  client_id,
}: {
  client_id: string;
}): Promise<Client> => {
  return axios.get(`/client/${client_id}/`);
};

type QueryFnType = typeof getClient;

type UseClientOptions = {
  client_id: string;
  config?: QueryConfig<QueryFnType>;
};

export const useClient = ({ client_id, config }: UseClientOptions) => {
  return useQuery<ExtractFnReturnType<QueryFnType>>({
    ...config,
    queryKey: ["client", client_id],
    queryFn: () => getClient({ client_id }),
  });
};
