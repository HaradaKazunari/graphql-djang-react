import { useMutation } from "@tanstack/react-query";

import { axios } from "@/lib/axios";
import { MutationConfig, queryClient } from "@/lib/react-query";
import { useNotificationStore } from "@/stores/notifications";

import { ProjectDetail } from "../types";

export type CreateProjectDetailDTO = {
  data: ProjectDetail;
  project_id: string;
};

export const createProjectDetail = ({
  data,
  project_id,
}: CreateProjectDetailDTO): Promise<ProjectDetail> => {
  return axios.post(`/projectdetail/`, { ...data, project: project_id });
};

type UseCreateProjectDetailOptions = {
  config?: MutationConfig<typeof createProjectDetail>;
};

export const useCreateProjectDetail = ({
  config,
}: UseCreateProjectDetailOptions = {}) => {
  const { addNotification } = useNotificationStore();

  return useMutation({
    onMutate: async (newProjectDetail: CreateProjectDetailDTO) => {
      await queryClient.cancelQueries({
        queryKey: ["project-details", newProjectDetail.project_id],
      });

      const previousProjectDetails =
        queryClient.getQueryData<ProjectDetail[]>([
          "project-details",
          newProjectDetail.project_id,
        ]) || [];

      queryClient.setQueryData(
        ["project-details", newProjectDetail.project_id],
        [...previousProjectDetails, newProjectDetail.data]
      );

      return {
        previousProjectDetails,
        project_id: newProjectDetail.project_id,
      };
    },
    onError: (_, __, context: any) => {
      if (context?.previousProjectDetails) {
        queryClient.setQueryData(
          ["project-details", context.previousProjectDetails.project_id],
          context.previousProjectDetails
        );
      }
    },
    onSuccess: (data) => {
      queryClient.invalidateQueries({
        queryKey: ["project-details", String(data.project)],
      });
      addNotification({
        type: "success",
        title: "明細を登録しました",
      });
    },
    ...config,
    mutationFn: createProjectDetail,
  });
};
