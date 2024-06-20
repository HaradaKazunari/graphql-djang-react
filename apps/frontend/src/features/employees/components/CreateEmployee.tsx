import { PlusIcon } from "@heroicons/react/24/outline";

import { Button } from "@/components/Elements";
import { Form, FormDrawer, InputField, SelectField } from "@/components/Form";
import { Authorization, ROLES } from "@/lib/authorization";

import { CreateEmployeeDTO, useCreateEmployee } from "../api";
import { getValidateRule } from "@/utils/validate";
import { useVersatilitys } from "@/features/versatility";
import { formatVersatilityOption } from "@/utils/options";

const schema = getValidateRule([
  "employee_name",
  "employee_kana",
  "position_code",
]);

export const CreateEmployee = () => {
  const createEmployeeMutation = useCreateEmployee();
  const versatilityQuery = useVersatilitys({
    params: {
      identify_code: "POSITION_CODE",
    },
  });

  return (
    <Authorization allowedRoles={[ROLES.ADMIN]}>
      <FormDrawer
        isDone={createEmployeeMutation.isSuccess}
        triggerButton={
          <Button size="sm" startIcon={<PlusIcon className="h-4 w-4" />}>
            社員登録
          </Button>
        }
        title="社員 登録"
        submitButton={
          <Button
            form="create-employee"
            type="submit"
            size="sm"
            isLoading={createEmployeeMutation.isPending}
          >
            登録
          </Button>
        }
      >
        <Form<CreateEmployeeDTO["data"], typeof schema>
          id="create-employee"
          onSubmit={(values) => {
            createEmployeeMutation.mutate({ data: values });
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
