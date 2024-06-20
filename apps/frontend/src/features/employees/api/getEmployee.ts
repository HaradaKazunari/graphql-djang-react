import { useQuery } from "@tanstack/react-query";

import { axios } from "@/lib/axios";
import { ExtractFnReturnType, QueryConfig } from "@/lib/react-query";

import { Employee } from "../types";

export const getEmployee = ({
  employee_id,
}: {
  employee_id: string;
}): Promise<Employee> => {
  return axios.get(`/employee/${employee_id}/`);
};

type QueryFnType = typeof getEmployee;

type UseEmployeeOptions = {
  employee_id: string;
  config?: QueryConfig<QueryFnType>;
};

export const useEmployee = ({ employee_id, config }: UseEmployeeOptions) => {
  return useQuery<ExtractFnReturnType<QueryFnType>>({
    ...config,
    queryKey: ["employee", employee_id],
    queryFn: () => getEmployee({ employee_id }),
  });
};
