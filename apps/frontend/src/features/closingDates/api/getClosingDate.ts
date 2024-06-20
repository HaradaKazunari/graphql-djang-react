import { useQuery } from "@tanstack/react-query";

import { axios } from "@/lib/axios";
import { ExtractFnReturnType, QueryConfig } from "@/lib/react-query";

import { ClosingDate } from "../types";

export const getClosingDate = ({
  closing_date_id,
}: {
  closing_date_id: string;
}): Promise<ClosingDate> => {
  return axios.get(`/closing/${closing_date_id}/`);
};

type QueryFnType = typeof getClosingDate;

type UseClosingDateOptions = {
  closing_date_id: string;
  config?: QueryConfig<QueryFnType>;
};

export const useClosingDate = ({
  closing_date_id,
  config,
}: UseClosingDateOptions) => {
  return useQuery<ExtractFnReturnType<QueryFnType>>({
    ...config,
    queryKey: ["closing-date", closing_date_id],
    queryFn: () => getClosingDate({ closing_date_id }),
  });
};
