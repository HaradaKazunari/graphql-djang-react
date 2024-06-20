import { useQuery } from "@tanstack/react-query";

import { axios } from "@/lib/axios";
import { ExtractFnReturnType, QueryConfig } from "@/lib/react-query";

import { UnclaimedProject } from "../types";

export const getUnclaimedProject = (): Promise<UnclaimedProject[]> => {
  return axios.get("/project/unclaimed");
};

type QueryFnType = typeof getUnclaimedProject;

type UseInvoicesOptions = {
  config?: QueryConfig<QueryFnType>;
};

export const useUnclaimedProject = ({ config }: UseInvoicesOptions = {}) => {
  return useQuery<ExtractFnReturnType<QueryFnType>>({
    ...config,
    queryKey: ["unclaimed-project"],
    queryFn: () => getUnclaimedProject(),
  });
};
