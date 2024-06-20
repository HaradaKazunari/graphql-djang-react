import { useMutation } from "@tanstack/react-query";

import { axios } from "@/lib/axios";
import { MutationConfig, queryClient } from "@/lib/react-query";
import { useNotificationStore } from "@/stores/notifications";

import { Client, InputClient } from "../types";

export type UpdateClientDTO = {
  data: InputClient;
  client_id: string;
};

export const updateClient = ({
  data,
  client_id,
}: UpdateClientDTO): Promise<Client> => {
  return axios.patch(`/client/${client_id}/`, data);
};

type UseUpdateClientOptions = {
  config?: MutationConfig<typeof updateClient>;
};

export const useUpdateClient = ({ config }: UseUpdateClientOptions = {}) => {
  const { addNotification } = useNotificationStore();

  return useMutation({
    onSuccess: (data) => {
      queryClient.refetchQueries({ queryKey: ["client", data.id] });
      addNotification({
        type: "success",
        title: "取引先を更新しました",
      });
    },
    ...config,
    mutationFn: updateClient,
  });
};
