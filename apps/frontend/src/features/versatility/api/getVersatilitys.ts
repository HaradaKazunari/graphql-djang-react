import { useQuery } from "@tanstack/react-query";

import { axios } from "@/lib/axios";
import { ExtractFnReturnType, QueryConfig } from "@/lib/react-query";

import { Versatility } from "../types";

export const getVersatilitys = ({ params = {} }): Promise<Versatility[]> => {
  return axios.get(`/versatility/`, { params });
};

type QueryFnType = typeof getVersatilitys;

type UseChargesOptions = {
  params?: any;
  config?: QueryConfig<QueryFnType>;
};

export const useVersatilitys = ({ params, config }: UseChargesOptions = {}) => {
  return useQuery<ExtractFnReturnType<QueryFnType>>({
    ...config,
    queryKey: ["versatilitys"],
    queryFn: () => getVersatilitys({ params }),
  });
};
