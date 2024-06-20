import { useMutation } from "@tanstack/react-query";

import { axios } from "@/lib/axios";
import { MutationConfig, queryClient } from "@/lib/react-query";
import { useNotificationStore } from "@/stores/notifications";

import { Contract, InputContract } from "../types";

export type UpdateContractDTO = {
  data: InputContract;
  contract_id: string;
  project_id: string;
};

export const updateContract = ({
  data,
  contract_id,
}: UpdateContractDTO): Promise<Contract> => {
  return axios.patch(`/contract/${contract_id}/`, data);
};

type UseUpdateContractOptions = {
  config?: MutationConfig<typeof updateContract>;
};

export const useUpdateContract = ({
  config,
}: UseUpdateContractOptions = {}) => {
  const { addNotification } = useNotificationStore();

  return useMutation({
    onMutate: async (updatingContract: UpdateContractDTO) => {
      await queryClient.cancelQueries({
        queryKey: ["contract", updatingContract?.contract_id],
      });

      const previousContract = queryClient.getQueryData<Contract>([
        "contract",
        updatingContract?.project_id,
      ]);

      queryClient.setQueryData(["contract", updatingContract?.contract_id], {
        ...previousContract,
        ...updatingContract.data,
        contract_id: updatingContract.contract_id,
      });

      return { previousContract };
    },
    onError: (_, __, context: any) => {
      if (context?.previousContract) {
        queryClient.setQueryData(
          ["contract", context.previousContract.contract_id],
          context.previousContract,
        );
      }
    },
    onSuccess: (data) => {
      queryClient.invalidateQueries({
        queryKey: ["contract", data.contract_id],
      });
      addNotification({
        type: "success",
        title: "受注情報を更新しました",
      });
    },
    ...config,
    mutationFn: updateContract,
  });
};
