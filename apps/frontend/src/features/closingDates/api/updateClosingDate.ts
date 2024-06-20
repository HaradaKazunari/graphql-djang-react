import { useMutation } from "@tanstack/react-query";

import { axios } from "@/lib/axios";
import { MutationConfig, queryClient } from "@/lib/react-query";
import { useNotificationStore } from "@/stores/notifications";

import { ClosingDate } from "../types";

export type UpdateClosingDateDTO = {
  closing_date_id: string;
  closing_fixed_date: string;
};

export const updateClosingDate = ({
  closing_date_id,
  closing_fixed_date,
}: UpdateClosingDateDTO): Promise<ClosingDate> => {
  return axios.post(`/closing/${closing_date_id}/confirm/`, {
    closing_fixed_date,
  });
};

type UseUpdateClosingDateOptions = {
  config?: MutationConfig<typeof updateClosingDate>;
};

export const useUpdateClosingDate = ({
  config,
}: UseUpdateClosingDateOptions = {}) => {
  const { addNotification } = useNotificationStore();

  return useMutation({
    onSuccess: () => {
      queryClient.refetchQueries({ queryKey: ["closing-dates"] });
      addNotification({
        type: "success",
        title: "締め日を確定しました",
      });
    },
    ...config,
    mutationFn: updateClosingDate,
  });
};
