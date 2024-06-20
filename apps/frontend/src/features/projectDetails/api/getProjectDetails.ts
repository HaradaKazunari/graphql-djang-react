import { useQuery } from "@tanstack/react-query";

import { axios } from "@/lib/axios";
import { ExtractFnReturnType, QueryConfig } from "@/lib/react-query";

import { ProjectDetail } from "../types";

type GetProjectDetails = {
  params?: {
    project_id?: string;
  };
};

export const getProjectDetails = ({
  params = {},
}: GetProjectDetails): Promise<ProjectDetail[]> => {
  return axios.get(`/projectdetail/`, { params });
};

type QueryFnType = typeof getProjectDetails;

type UseProjectDetailsOptions = {
  config?: QueryConfig<QueryFnType>;
} & GetProjectDetails;

export const useProjectDetails = ({
  params = {},
  config = {},
}: UseProjectDetailsOptions = {}) => {
  return useQuery<ExtractFnReturnType<QueryFnType>>({
    ...config,
    queryKey: ["project-details", params.project_id],
    queryFn: () => getProjectDetails({ params }),
  });
};
