import { useMutation } from "@tanstack/react-query";

import { axios } from "@/lib/axios";
import { MutationConfig, queryClient } from "@/lib/react-query";
import { useNotificationStore } from "@/stores/notifications";

import { Employee } from "../types";

export type CreateEmployeeDTO = {
  data: {
    employee_name: string;
    employee_kana: string;
    position_code: string;
  };
};

export const createEmployee = ({
  data,
}: CreateEmployeeDTO): Promise<Employee> => {
  return axios.post(`/employee/`, data);
};

type UseCreateDiscussionOptions = {
  config?: MutationConfig<typeof createEmployee>;
};

export const useCreateEmployee = ({
  config,
}: UseCreateDiscussionOptions = {}) => {
  const { addNotification } = useNotificationStore();
  return useMutation({
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["employees"] });
      addNotification({
        type: "success",
        title: "社員を登録しました",
      });
    },
    ...config,
    mutationFn: createEmployee,
  });
};
