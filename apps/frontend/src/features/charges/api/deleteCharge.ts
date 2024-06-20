import { useMutation } from "@tanstack/react-query";

import { axios } from "@/lib/axios";
import { MutationConfig, queryClient } from "@/lib/react-query";
import { useNotificationStore } from "@/stores/notifications";

export type DeleteChargeDTO = {
  charge_id: string;
};

export const deleteCharge = ({ charge_id }: DeleteChargeDTO) => {
  return axios.delete(`/charge/${charge_id}/`);
};

type UseDeleteChargeOptions = {
  config?: MutationConfig<typeof deleteCharge>;
};

export const useDeleteCharge = ({ config }: UseDeleteChargeOptions = {}) => {
  const { addNotification } = useNotificationStore();

  return useMutation({
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["charges"] });
      addNotification({
        type: "success",
        title: "担当者を削除しました",
      });
    },
    ...config,
    mutationFn: deleteCharge,
  });
};
