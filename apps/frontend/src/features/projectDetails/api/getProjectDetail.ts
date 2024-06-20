import { useQuery } from "@tanstack/react-query";

import { axios } from "@/lib/axios";
import { ExtractFnReturnType, QueryConfig } from "@/lib/react-query";

import { ProjectDetail } from "../types";

export const getProjectDetail = ({
  project_detail_id,
}: {
  project_detail_id: string;
}): Promise<ProjectDetail> => {
  return axios.get(`/projectdetail/${project_detail_id}/`);
};

type QueryFnType = typeof getProjectDetail;

type UseProjectDetailOptions = {
  project_detail_id: string;
  config?: QueryConfig<QueryFnType>;
};

export const useProjectDetail = ({
  project_detail_id,
  config,
}: UseProjectDetailOptions) => {
  return useQuery<ExtractFnReturnType<QueryFnType>>({
    ...config,
    queryKey: ["project-detail", project_detail_id],
    queryFn: () => getProjectDetail({ project_detail_id }),
  });
};
