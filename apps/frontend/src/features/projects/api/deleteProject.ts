import { useMutation } from "@tanstack/react-query";

import { axios } from "@/lib/axios";
import { MutationConfig, queryClient } from "@/lib/react-query";

import { Project } from "../types";
import { useNavigate } from "react-router-dom";
import { useNotificationStore } from "@/stores/notifications";

export const deleteProject = ({
  project_id,
}: {
  project_id: string;
}): Promise<Project> => {
  return axios.delete(`/project/${project_id}/`);
};

type UseProjectOptions = {
  config?: MutationConfig<typeof deleteProject>;
};

export const useDeleteProject = ({ config }: UseProjectOptions = {}) => {
  const navigate = useNavigate();
  const { addNotification } = useNotificationStore();

  return useMutation({
    onMutate: async (deleteProject) => {
      await queryClient.cancelQueries({ queryKey: ["projects"] });

      const previousProjects = queryClient.getQueryData<Project[]>([
        "projects",
      ]);

      queryClient.setQueryData(
        ["projects"],
        previousProjects?.filter(
          (project) => project.project_id !== deleteProject.project_id,
        ),
      );

      return { previousProjects };
    },
    onError: (_, __, context: any) => {
      if (context?.previousProjects) {
        queryClient.setQueryData(["projects"], context.previousProjects);
      }
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["projects"] });
      addNotification({
        type: "success",
        title: "案件を削除しました",
      });
      navigate("..");
    },
    ...config,
    mutationFn: deleteProject,
  });
};
