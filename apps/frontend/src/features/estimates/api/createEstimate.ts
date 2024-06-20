import { useMutation } from "@tanstack/react-query";

import { axios } from "@/lib/axios";
import { MutationConfig, queryClient } from "@/lib/react-query";
import { useNotificationStore } from "@/stores/notifications";

import { InputEstimate } from "../types";
import { ProjectDetail } from "@/features/projectDetails";

export type CreateEstimateDTO = {
  data: InputEstimate & {
    project_name: string;
    charge_id: string;
  } & { project_detail: ProjectDetail[] };
};

export const createEstimate = async ({
  data,
}: CreateEstimateDTO): Promise<void> => {
  return axios
    .post("/project/", {
      project_name: data.project_name,
      charge: data.charge_id,
    })
    .then((res) => {
      // @ts-ignore
      const project_id = res.project_id;
      axios
        .post("/estimate/", {
          ...data,
          project: project_id,
        })
        .then(() => {
          data.project_detail.map((d) => {
            axios.post("/projectdetail/", {
              ...d,
              project: project_id,
            });
          });
        })
        .catch(() => {
          axios.delete(`/project/${project_id}/`);
        });
    });
};

type UseCreateEstimateOptions = {
  config?: MutationConfig<typeof createEstimate>;
};

export const useCreateEstimate = ({
  config,
}: UseCreateEstimateOptions = {}) => {
  const { addNotification } = useNotificationStore();
  return useMutation({
    onSuccess: () => {
      queryClient.refetchQueries({ queryKey: ["projects"] });
      addNotification({
        type: "success",
        title: "見積もりを登録しました",
      });
    },
    ...config,
    mutationFn: createEstimate,
  });
};
