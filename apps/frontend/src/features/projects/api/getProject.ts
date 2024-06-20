import { useQuery } from "@tanstack/react-query";

import { axios } from "@/lib/axios";
import { ExtractFnReturnType, QueryConfig } from "@/lib/react-query";

import { Project } from "../types";

export const getProject = ({
  project_id,
}: {
  project_id: string;
}): Promise<Project> => {
  return axios.get(`/project/${project_id}/`);
};

type QueryFnType = typeof getProject;

type UseProjectOptions = {
  project_id: string;
  config?: QueryConfig<QueryFnType>;
};

export const useProject = ({ project_id, config }: UseProjectOptions) => {
  return useQuery<ExtractFnReturnType<QueryFnType>>({
    ...config,
    queryKey: ["project", project_id],
    queryFn: () => getProject({ project_id }),
  });
};
