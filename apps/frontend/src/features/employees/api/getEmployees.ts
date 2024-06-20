import { useQuery } from "@tanstack/react-query";

import { axios } from "@/lib/axios";
import { ExtractFnReturnType, QueryConfig } from "@/lib/react-query";

import { Employee } from "../types";

export const getEmployees = (): Promise<Employee[]> => {
  return axios.get(`/employee/`);
};

type QueryFnType = typeof getEmployees;

type UseEmployeesOptions = {
  config?: QueryConfig<QueryFnType>;
};

export const useEmployees = ({ config }: UseEmployeesOptions = {}) => {
  return useQuery<ExtractFnReturnType<QueryFnType>>({
    ...config,
    queryKey: ["employees"],
    queryFn: () => getEmployees(),
  });
};
