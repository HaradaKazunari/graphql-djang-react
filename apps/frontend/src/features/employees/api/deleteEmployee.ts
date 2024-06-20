import { useMutation } from "@tanstack/react-query";

import { axios } from "@/lib/axios";
import { MutationConfig, queryClient } from "@/lib/react-query";
import { useNotificationStore } from "@/stores/notifications";

export type DeleteEmployeeDTO = {
  employee_id: string;
};

export const deleteEmployee = ({ employee_id }: DeleteEmployeeDTO) => {
  return axios.delete(`/employee/${employee_id}/`);
};

type UseDeleteEmployeeOptions = {
  config?: MutationConfig<typeof deleteEmployee>;
};

export const useDeleteEmployee = ({
  config,
}: UseDeleteEmployeeOptions = {}) => {
  const { addNotification } = useNotificationStore();

  return useMutation({
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["employees"] });
      addNotification({
        type: "success",
        title: "社員を削除しました",
      });
    },
    ...config,
    mutationFn: deleteEmployee,
  });
};
