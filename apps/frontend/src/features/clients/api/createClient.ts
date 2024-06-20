import { useMutation } from "@tanstack/react-query";

import { axios } from "@/lib/axios";
import { MutationConfig, queryClient } from "@/lib/react-query";
import { useNotificationStore } from "@/stores/notifications";

import { Client, InputClient } from "../types";

export type CreateClientDTO = {
  data: InputClient;
};

export const createClient = ({ data }: CreateClientDTO): Promise<Client> => {
  return axios.post(`/client/`, data);
};

type UseCreateDiscussionOptions = {
  config?: MutationConfig<typeof createClient>;
};

export const useCreateClient = ({
  config,
}: UseCreateDiscussionOptions = {}) => {
  const { addNotification } = useNotificationStore();
  return useMutation({
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["clients"] });
      addNotification({
        type: "success",
        title: "取引先を登録しました",
      });
    },
    ...config,
    mutationFn: createClient,
  });
};
