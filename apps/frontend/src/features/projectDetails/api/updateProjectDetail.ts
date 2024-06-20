import { useMutation } from "@tanstack/react-query";

import { axios } from "@/lib/axios";
import { MutationConfig, queryClient } from "@/lib/react-query";
import { useNotificationStore } from "@/stores/notifications";

import { ProjectDetail } from "../types";

export type UpdateProjectDetailDTO = {
  data: ProjectDetail;
  project_detail_id: string;
  project_id: string;
};

export const updateProjectDetail = ({
  data,
  project_detail_id,
}: UpdateProjectDetailDTO): Promise<ProjectDetail> => {
  return axios.patch(`/projectdetail/${project_detail_id}/`, data);
};

type UseUpdateProjectDetailOptions = {
  config?: MutationConfig<typeof updateProjectDetail>;
};

export const useUpdateProjectDetail = ({
  config,
}: UseUpdateProjectDetailOptions = {}) => {
  const { addNotification } = useNotificationStore();

  return useMutation({
    onMutate: async (updatingProjectDetail: UpdateProjectDetailDTO) => {
      await queryClient.cancelQueries({
        queryKey: ["project-details", updatingProjectDetail.project_id],
      });

      const previousProjectDetails =
        queryClient.getQueryData<ProjectDetail[]>([
          "project-details",
          updatingProjectDetail.project_id,
        ]) || [];

      queryClient.setQueryData(
        ["project-details", updatingProjectDetail.project_id],
        previousProjectDetails.map((detail) =>
          updatingProjectDetail.project_detail_id === detail.id
            ? { ...detail, ...updatingProjectDetail.data }
            : detail
        )
      );

      return {
        previousProjectDetails,
        project_id: updatingProjectDetail.project_id,
      };
    },
    onError: (_, __, context: any) => {
      if (context?.previousProjectDetails) {
        queryClient.setQueryData(
          ["project-details", context.project_id],
          context.previousProjectDetails
        );
      }
    },

    onSuccess: (data) => {
      queryClient.invalidateQueries({
        queryKey: ["project-details", data.project],
      });
      addNotification({
        type: "success",
        title: "明細を更新しました",
      });
    },
    ...config,
    mutationFn: updateProjectDetail,
  });
};
