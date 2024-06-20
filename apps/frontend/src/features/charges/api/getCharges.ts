import { useQuery } from "@tanstack/react-query";

import { axios } from "@/lib/axios";
import { ExtractFnReturnType, QueryConfig } from "@/lib/react-query";

import { Charge } from "../types";

type GetCharges = {
  params?: {
    client_id: string;
  };
};
export const getCharges = ({ params }: GetCharges): Promise<Charge[]> => {
  return axios.get(`/charge/`, { params });
};

type QueryFnType = typeof getCharges;

type UseChargesOptions = {
  params?: {
    client_id: string;
  };
  config?: QueryConfig<QueryFnType>;
};

export const useCharges = ({ params, config }: UseChargesOptions = {}) => {
  return useQuery<ExtractFnReturnType<QueryFnType>>({
    ...config,
    queryKey: ["charges"],
    queryFn: () => getCharges({ params }),
  });
};
