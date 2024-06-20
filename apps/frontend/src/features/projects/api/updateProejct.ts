import { useMutation } from "@tanstack/react-query";

import { axios } from "@/lib/axios";
import { MutationConfig, queryClient } from "@/lib/react-query";
import { useNotificationStore } from "@/stores/notifications";

import { InputProject, Project } from "../types";

export type UpdateProjectDTO = {
  data: InputProject;
  project_id: string;
};

export const updateProject = ({
  data,
  project_id,
}: UpdateProjectDTO): Promise<Project> => {
  return axios.patch(`/project/${project_id}/`, {
    ...data,
    charge: data.charge_id,
  });
};

type UseUpdateProjectOptions = {
  project_id: string;
  config?: MutationConfig<typeof updateProject>;
};

export const useUpdateProject = ({
  project_id,
  config = {},
}: UseUpdateProjectOptions) => {
  const { addNotification } = useNotificationStore();

  return useMutation({
    onSuccess: () => {
      queryClient.refetchQueries({ queryKey: ["project", project_id] });
      addNotification({
        type: "success",
        title: "案件情報を更新しました",
      });
    },
    ...config,
    mutationFn: updateProject,
  });
};
