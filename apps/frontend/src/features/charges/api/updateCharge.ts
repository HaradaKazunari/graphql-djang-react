import { useMutation } from "@tanstack/react-query";

import { axios } from "@/lib/axios";
import { MutationConfig, queryClient } from "@/lib/react-query";
import { useNotificationStore } from "@/stores/notifications";

import { Charge, InputCharge } from "../types";

export type UpdateChargeDTO = {
  data: InputCharge;
  charge_id: string;
};

export const updateCharge = ({
  data,
  charge_id,
}: UpdateChargeDTO): Promise<Charge> => {
  return axios.patch(`/charge/${charge_id}/`, data);
};

type UseUpdateChargeOptions = {
  config?: MutationConfig<typeof updateCharge>;
};

export const useUpdateCharge = ({ config }: UseUpdateChargeOptions = {}) => {
  const { addNotification } = useNotificationStore();

  return useMutation({
    onSuccess: () => {
      queryClient.refetchQueries({ queryKey: ["charges"] });
      addNotification({
        type: "success",
        title: "担当者を更新しました",
      });
    },
    ...config,
    mutationFn: updateCharge,
  });
};
