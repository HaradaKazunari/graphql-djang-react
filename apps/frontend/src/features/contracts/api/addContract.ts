import { useMutation } from "@tanstack/react-query";

import { axios } from "@/lib/axios";
import { MutationConfig, queryClient } from "@/lib/react-query";
import { useNotificationStore } from "@/stores/notifications";

import { Contract, InputContract } from "../types";

export type AddContractDTO = {
  data: InputContract;
  project_id: string;
};

export const addContract = ({
  data,
  project_id,
}: AddContractDTO): Promise<Contract> => {
  return axios.post(`/contract/`, { ...data, project: project_id });
};

type UseAddContractOptions = {
  config?: MutationConfig<typeof addContract>;
};

export const useAddContract = ({ config }: UseAddContractOptions = {}) => {
  const { addNotification } = useNotificationStore();

  return useMutation({
    onSuccess: (data) => {
      queryClient.invalidateQueries({
        queryKey: ["project", String(data.project)],
      });
      addNotification({
        type: "success",
        title: "受注情報を登録しました",
      });
    },
    ...config,
    mutationFn: addContract,
  });
};
