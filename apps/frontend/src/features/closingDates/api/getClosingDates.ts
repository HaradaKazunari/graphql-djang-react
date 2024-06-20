import { useQuery } from "@tanstack/react-query";

import { axios } from "@/lib/axios";
import { ExtractFnReturnType, QueryConfig } from "@/lib/react-query";

import { ClosingDate } from "../types";

export const getClosingDates = (): Promise<ClosingDate[]> => {
  return axios.get(`/closing/`);
};

type QueryFnType = typeof getClosingDates;

type UseClosingDatesOptions = {
  config?: QueryConfig<QueryFnType>;
};

export const useClosingDates = ({ config }: UseClosingDatesOptions = {}) => {
  return useQuery<ExtractFnReturnType<QueryFnType>>({
    ...config,
    queryKey: ["closing-dates"],
    queryFn: () => getClosingDates(),
  });
};
