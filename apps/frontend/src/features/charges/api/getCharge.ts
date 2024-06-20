import { useQuery } from "@tanstack/react-query";

import { axios } from "@/lib/axios";
import { ExtractFnReturnType, QueryConfig } from "@/lib/react-query";

import { Charge } from "../types";

export const getCharge = ({
  charge_id,
}: {
  charge_id: string;
}): Promise<Charge> => {
  return axios.get(`/charge/${charge_id}/`);
};

type QueryFnType = typeof getCharge;

type UseChargeOptions = {
  charge_id: string;
  config?: QueryConfig<QueryFnType>;
};

export const useCharge = ({ charge_id, config }: UseChargeOptions) => {
  return useQuery<ExtractFnReturnType<QueryFnType>>({
    ...config,
    queryKey: ["charge", charge_id],
    queryFn: () => getCharge({ charge_id }),
  });
};
