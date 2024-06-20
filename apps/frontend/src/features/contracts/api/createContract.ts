import { useMutation } from "@tanstack/react-query";

import { axios } from "@/lib/axios";
import { MutationConfig, queryClient } from "@/lib/react-query";
import { useNotificationStore } from "@/stores/notifications";

import { Contract, InputContract } from "../types";
import { ProjectDetail } from "@/features/projectDetails";

export type CreateContractDTO = {
  data: InputContract & {
    project_detail: ProjectDetail[];
  };
};

export const createContract = async ({
  data,
}: CreateContractDTO): Promise<void | Contract> => {
  return axios
    .post("/project/", {
      project_name: data.project_name,
      charge: data.charge_id,
    })
    .then((res) => {
      // @ts-ignore
      const project_id = res.project_id;
      axios
        .post("/contract/", {
          ...data,
          project: project_id,
        })
        .then(() => {
          data.project_detail.map((d: ProjectDetail) => {
            axios.post("/projectdetail/", {
              ...d,
              project: project_id,
            });
          });
        });
    });
};

type UseCreateContractOptions = {
  config?: MutationConfig<typeof createContract>;
};

export const useCreateContract = ({
  config,
}: UseCreateContractOptions = {}) => {
  const { addNotification } = useNotificationStore();
  return useMutation({
    onSuccess: () => {
      queryClient.refetchQueries({ queryKey: ["projects"] });
      addNotification({
        type: "success",
        title: "受注登録しました",
      });
    },
    ...config,
    mutationFn: createContract,
  });
};
