import { useQuery } from "@tanstack/react-query";

import { axios } from "@/lib/axios";
import { ExtractFnReturnType, QueryConfig } from "@/lib/react-query";

import { Estimate } from "../types";

export const getEstimate = async ({
  estimate_id,
}: {
  estimate_id: string;
}): Promise<Estimate> => {
  return axios.get(`/estimate/${estimate_id}/`);
};

type QueryFnType = typeof getEstimate;

type UseEstimateOptions = {
  estimate_id: string;
  config?: QueryConfig<QueryFnType>;
};

export const useEstimate = ({
  estimate_id,
  config = {},
}: UseEstimateOptions) => {
  return useQuery<ExtractFnReturnType<QueryFnType>>({
    ...config,
    queryKey: ["estimate", estimate_id],
    queryFn: () => getEstimate({ estimate_id }),
  });
};
