import { useMutation } from "@tanstack/react-query";

import { axios } from "@/lib/axios";
import { MutationConfig, queryClient } from "@/lib/react-query";
import { useNotificationStore } from "@/stores/notifications";

export const deleteClient = ({ client_id }: { client_id: string }) => {
  return axios.delete(`/client/${client_id}/`);
};

type UseDeleteClientOptions = {
  config?: MutationConfig<typeof deleteClient>;
};

export const useDeleteClient = ({ config }: UseDeleteClientOptions = {}) => {
  const { addNotification } = useNotificationStore();

  return useMutation({
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["clients"] });
      addNotification({
        type: "success",
        title: "取引先を削除しました",
      });
    },
    ...config,
    mutationFn: deleteClient,
  });
};
