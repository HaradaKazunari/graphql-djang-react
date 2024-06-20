import { useMutation } from "@tanstack/react-query";

import { axios } from "@/lib/axios";
import { MutationConfig, queryClient } from "@/lib/react-query";
import { useNotificationStore } from "@/stores/notifications";

import { ClosingDate } from "../types";

export type CreateClosingDateDTO = {
  data: {
    closing_ym: string | Date;
    closing_fixed_date: string;
  };
};

export const createClosingDate = ({
  data,
}: CreateClosingDateDTO): Promise<ClosingDate> => {
  return axios.post(`/closing/`, data);
};

type UseCreateDiscussionOptions = {
  config?: MutationConfig<typeof createClosingDate>;
};

export const useCreateClosingDate = ({
  config,
}: UseCreateDiscussionOptions = {}) => {
  const { addNotification } = useNotificationStore();
  return useMutation({
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["closing-dates"] });
      addNotification({
        type: "success",
        title: "締め日を確定しました",
      });
    },
    ...config,
    mutationFn: createClosingDate,
  });
};
