import { useMutation } from "@tanstack/react-query";

import { axios } from "@/lib/axios";
import { MutationConfig, queryClient } from "@/lib/react-query";
import { useNotificationStore } from "@/stores/notifications";

import { Charge, InputCharge } from "../types";

export type CreateChargeDTO = {
  data: InputCharge;
};

export const createCharge = ({ data }: CreateChargeDTO): Promise<Charge> => {
  return axios.post(`/charge/`, data);
};

type UseCreateChargeOptions = {
  config?: MutationConfig<typeof createCharge>;
};

export const useCreateCharge = ({ config }: UseCreateChargeOptions = {}) => {
  const { addNotification } = useNotificationStore();
  return useMutation({
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["charges"] });
      addNotification({
        type: "success",
        title: "担当者を登録しました",
      });
    },
    ...config,
    mutationFn: createCharge,
  });
};
