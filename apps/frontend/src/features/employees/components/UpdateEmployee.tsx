import { Button } from "@/components/Elements";
import { Form, FormDrawer, InputField, SelectField } from "@/components/Form";
import { Authorization, ROLES } from "@/lib/authorization";

import { useEmployee } from "../api";
import { UpdateEmployeeDTO, useUpdateEmployee } from "../api";
import { getValidateRule } from "@/utils/validate";
import { useVersatilitys } from "@/features/versatility";
import { formatVersatilityOption } from "@/utils/options";

type UpdateEmployeeProps = {
  employee_id: string;
};

const schema = getValidateRule([
  "employee_name",
  "employee_kana",
  "position_code",
]);

export const UpdateEmployee = ({ employee_id }: UpdateEmployeeProps) => {
  const employeeQuery = useEmployee({ employee_id });
  const updateEmployeeMutation = useUpdateEmployee();
  const versatilityQuery = useVersatilitys({
    params: {
      identify_code: "POSITION_CODE",
    },
  });

  return (
    <Authorization allowedRoles={[ROLES.ADMIN]}>
      <FormDrawer
        isDone={updateEmployeeMutation.isSuccess}
        triggerButton={<Button size="sm">編集</Button>}
        title="社員 編集"
        submitButton={
          <Button
            form="update-employee"
            type="submit"
            size="sm"
            isLoading={updateEmployeeMutation.isPending}
          >
            確定
          </Button>
        }
      >
        <Form<UpdateEmployeeDTO["data"], typeof schema>
          id="update-employee"
          onSubmit={(values) => {
            updateEmployeeMutation.mutate({ data: values, employee_id });
          }}
          options={{
            defaultValues: {
              employee_name: employeeQuery.data?.employee_name,
              employee_kana: employeeQuery.data?.employee_kana,
              position_code: employeeQuery.data?.position_code,
            },
          }}
          schema={schema}
        >
          {({ register, formState }) => (
            <>
              <InputField
                label="社員名"
                error={formState.errors["employee_name"]}
                registration={register("employee_name")}
              />

              <InputField
                label="社員かな"
                error={formState.errors["employee_kana"]}
                registration={register("employee_kana")}
              />

              <SelectField
                label="役職"
                error={formState.errors["position_code"]}
                registration={register("position_code")}
                options={formatVersatilityOption(versatilityQuery)}
              />
            </>
          )}
        </Form>
      </FormDrawer>
    </Authorization>
  );
};
