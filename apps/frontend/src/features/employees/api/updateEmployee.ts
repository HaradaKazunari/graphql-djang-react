import { useMutation } from "@tanstack/react-query";

import { axios } from "@/lib/axios";
import { MutationConfig, queryClient } from "@/lib/react-query";
import { useNotificationStore } from "@/stores/notifications";

import { Employee, InputEmployee } from "../types";

export type UpdateEmployeeDTO = {
  data: InputEmployee;
  employee_id: string;
};

export const updateEmployee = ({
  data,
  employee_id,
}: UpdateEmployeeDTO): Promise<Employee> => {
  return axios.patch(`/employee/${employee_id}/`, data);
};

type UseUpdateEmployeeOptions = {
  config?: MutationConfig<typeof updateEmployee>;
};

export const useUpdateEmployee = ({
  config,
}: UseUpdateEmployeeOptions = {}) => {
  const { addNotification } = useNotificationStore();

  return useMutation({
    onSuccess: () => {
      queryClient.refetchQueries({ queryKey: ["employees"] });
      addNotification({
        type: "success",
        title: "社員を更新しました",
      });
    },
    ...config,
    mutationFn: updateEmployee,
  });
};
