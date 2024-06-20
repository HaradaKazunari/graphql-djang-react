import { Table, Spinner } from "@/components/Elements";

import { useEmployees } from "../api";
import { Employee } from "../types";
import { DeleteEmployee } from "./DeleteEmployee";
import { UpdateEmployee } from "./UpdateEmployee";
import { GetVersatilityValue } from "@/utils/versatility";

export const EmployeesList = () => {
  const employeeQuery = useEmployees();

  if (employeeQuery.isPending) {
    return (
      <div className="w-full h-48 flex justify-center items-center">
        <Spinner size="lg" />
      </div>
    );
  }

  if (!employeeQuery.data) return null;

  return (
    <Table<Employee>
      isSorting
      isPager
      data={employeeQuery.data}
      columns={[
        {
          title: "社員名",
          field: "employee_name",
          Cell: ({ entry: { employee_name } }) => {
            return <div className="text-center">{employee_name}</div>;
          },
        },
        {
          title: "社員かな",
          field: "employee_kana",
          Cell: ({ entry: { employee_kana } }) => {
            return <div className="text-center">{employee_kana}</div>;
          },
        },
        {
          title: "役職",
          field: "position_code",
          Cell: ({ entry: { position_code } }) => {
            return (
              <div className="text-center">
                {GetVersatilityValue("POSITION_CODE", position_code)}
              </div>
            );
          },
        },
        {
          title: "",
          field: "employee_id",
          Cell: ({ entry: { employee_id } }) => {
            return (
              <div className="flex justify-center">
                <UpdateEmployee employee_id={employee_id} />
              </div>
            );
          },
        },
        {
          title: "",
          field: "employee_id",
          Cell: ({ entry: { employee_id } }) => {
            return (
              <div className="flex justify-center">
                <DeleteEmployee id={employee_id} />
              </div>
            );
          },
        },
      ]}
    />
  );
};
