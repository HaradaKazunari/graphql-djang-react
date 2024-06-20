import { Authorization, ROLES } from "@/lib/authorization";
import { Spinner } from "@/components/Elements";
import { Form, InputField, SelectField } from "@/components/Form";
import { getValidateRule } from "@/utils/validate";
import { addClientCompanyName, formatQueryOption } from "@/utils/options";
import { useCharges } from "@/features/charges";
import { useClients } from "@/features/clients";
import { UpdateProjectDTO, useProject, useUpdateProject } from "../api";

export const UpdateProject = ({ project_id }: { project_id: string }) => {
  const projectQuery = useProject({ project_id });
  const chargesQuery = useCharges();
  const clientsQuery = useClients();
  const updateProjectMutate = useUpdateProject({ project_id });

  const schema = getValidateRule(["project_name", "charge_id"]);

  if (chargesQuery.isPending && clientsQuery.isPending) {
    return (
      <div className="w-full h-48 flex justify-center items-center">
        <Spinner size="lg" />
      </div>
    );
  }

  const onBlur = (values: UpdateProjectDTO["data"]) => {
    updateProjectMutate.mutate({
      data: { ...values },
      project_id,
    });
  };

  return (
    <Authorization allowedRoles={[ROLES.ADMIN]}>
      <Form<UpdateProjectDTO["data"], typeof schema>
        id="update-employee"
        onSubmit={() => true}
        options={{
          defaultValues: {
            project_name: projectQuery.data?.project_name,
            charge_id: projectQuery.data?.charge_id,
          },
        }}
        schema={schema}
      >
        {({ register, formState, getValues }) => (
          <div className="flex items-center gap-2">
            <InputField
              label="案件名"
              error={formState.errors["project_name"]}
              registration={register("project_name", {
                onBlur: () => onBlur(getValues()),
              })}
            />

            <SelectField
              label="担当者"
              error={formState.errors["charge_id"]}
              registration={register("charge_id", {
                onBlur: () => onBlur(getValues()),
              })}
              defaultValue={projectQuery.data?.charge_id}
              options={formatQueryOption({
                query: chargesQuery,
                value_key: "charge_id",
                label_key: "charge_name",
              }).map((option) =>
                addClientCompanyName({ option, chargesQuery, clientsQuery })
              )}
            />
          </div>
        )}
      </Form>
    </Authorization>
  );
};
