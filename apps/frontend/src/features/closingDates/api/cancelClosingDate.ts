import { useMutation } from "@tanstack/react-query";

import { axios } from "@/lib/axios";
import { MutationConfig, queryClient } from "@/lib/react-query";
import { useNotificationStore } from "@/stores/notifications";

import { ClosingDate } from "../types";

export type cancelClosingDateDTO = {
  closing_date_id: string;
};

export const canCelClosingDate = ({
  closing_date_id,
}: cancelClosingDateDTO): Promise<ClosingDate> => {
  return axios.post(`/closing/${closing_date_id}/cancel/`);
};

type UseCancelClosingDateOptions = {
  config?: MutationConfig<typeof canCelClosingDate>;
};

export const useCancelClosingDate = ({
  config,
}: UseCancelClosingDateOptions = {}) => {
  const { addNotification } = useNotificationStore();

  return useMutation({
    onSuccess: (data) => {
      queryClient.refetchQueries({ queryKey: ["closing-date", data.id] });
      queryClient.refetchQueries({ queryKey: ["closing-dates"] });
      addNotification({
        type: "success",
        title: "締め日をキャンセルしました",
      });
    },
    ...config,
    mutationFn: canCelClosingDate,
  });
};
