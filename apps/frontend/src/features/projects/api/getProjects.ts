import { useQuery } from "@tanstack/react-query";

import { axios } from "@/lib/axios";
import { ExtractFnReturnType, QueryConfig } from "@/lib/react-query";

import { Projects } from "../types";

export const getProjects = (): Promise<Projects[]> => {
  return axios.get("/project/");
};

type QueryFnType = typeof getProjects;

type UseProjectsOptions = {
  config?: QueryConfig<QueryFnType>;
};

export const useProjects = ({ config }: UseProjectsOptions = {}) => {
  return useQuery<ExtractFnReturnType<QueryFnType>>({
    ...config,
    queryKey: ["projects"],
    queryFn: () => getProjects(),
  });
};
