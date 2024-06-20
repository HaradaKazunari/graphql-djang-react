import { useMutation } from "@tanstack/react-query";

import { axios } from "@/lib/axios";
import { MutationConfig, queryClient } from "@/lib/react-query";
import { useNotificationStore } from "@/stores/notifications";

import { ProjectDetail } from "../types";

export type DeleteProjectDetailDTO = {
  project_detail_id: string;
};

export const deleteProjectDetail = ({
  project_detail_id,
}: DeleteProjectDetailDTO): Promise<ProjectDetail> => {
  return axios.delete(`/projectdetail/${project_detail_id}/`);
};

type UseDeleteProjectDetailOptions = {
  project_id: string;
  config?: MutationConfig<typeof deleteProjectDetail>;
};

export const useDeleteProjectDetail = ({
  config = {},
  project_id,
}: UseDeleteProjectDetailOptions) => {
  const { addNotification } = useNotificationStore();

  return useMutation({
    onMutate: async (deleteProjectDetail) => {
      await queryClient.cancelQueries({
        queryKey: ["project-details", project_id],
      });

      const previousProjectDetail =
        queryClient.getQueryData<ProjectDetail[]>([
          "project-details",
          project_id,
        ]) || [];
      const filteredProjectDetail = previousProjectDetail.filter(
        (prev) => prev.id != deleteProjectDetail.project_detail_id,
      );

      queryClient.setQueryData(
        ["project-details", project_id],
        filteredProjectDetail,
      );

      return { previousProjectDetail };
    },
    onError: (_, __, context: any) => {
      if (context.previousProjectDetail) {
        queryClient.setQueryData(
          ["project-details", project_id],
          context.previousProjectDetail,
        );
      }
    },
    onSuccess: () => {
      queryClient.refetchQueries({
        queryKey: ["project-details", project_id],
      });
      addNotification({
        type: "success",
        title: "明細を削除しました",
      });
    },
    ...config,
    mutationFn: deleteProjectDetail,
  });
};
