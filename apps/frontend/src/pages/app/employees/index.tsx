import { ContentLayout } from "@/components/Layout";
import { Authorization, ROLES } from "@/lib/authorization";

import { EmployeesList, CreateEmployee } from "@/features/employees";

export const Employees = () => {
  return (
    <ContentLayout title="社員一覧">
      <div className="flex justify-end">
        <CreateEmployee />
      </div>
      <div className="mt-4">
        <Authorization
          forbiddenFallback={<div>Only admin can view this.</div>}
          allowedRoles={[ROLES.ADMIN]}
        >
          <EmployeesList />
        </Authorization>
      </div>
    </ContentLayout>
  );
};

export default Employees;
