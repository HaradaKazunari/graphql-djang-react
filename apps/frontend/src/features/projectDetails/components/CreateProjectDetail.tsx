import { Button } from "@/components/Elements";
import { Form, FormDrawer, InputField, SelectField } from "@/components/Form";
import { Authorization, ROLES } from "@/lib/authorization";

import { CreateProjectDetailDTO, useCreateProjectDetail } from "../api";
import { getValidateRule } from "@/utils/validate";
import { useVersatilitys } from "@/features/versatility";
import { formatVersatilityOption } from "@/utils/options";
import { getAmountPrice } from "../helper";

type CreateProjectDetailProps = {
  project_id: string;
  disabled?: boolean;
};

const schema = getValidateRule([
  "product_name",
  "model_name",
  "amount",
  "amount_unit",
  "unit_price",
  "remarks",
]);

export const CreateProjectDetail = ({
  project_id,
  disabled = false,
}: CreateProjectDetailProps) => {
  const createProjectMutation = useCreateProjectDetail();
  const versatilityQuery = useVersatilitys({
    params: {
      identify_code: "UNIT",
    },
  });

  return (
    <Authorization allowedRoles={[ROLES.ADMIN]}>
      <FormDrawer
        isDone={createProjectMutation.isSuccess}
        triggerButton={
          <Button size="sm" disabled={disabled}>
            明細新規追加
          </Button>
        }
        title="明細 作成"
        submitButton={
          <Button
            form="create-project-detail"
            type="submit"
            size="sm"
            isLoading={createProjectMutation.isPending}
          >
            追加
          </Button>
        }
      >
        <Form<CreateProjectDetailDTO["data"], typeof schema>
          id="create-project-detail"
          onSubmit={(values) => {
            createProjectMutation.mutate({
              data: values,
              project_id,
            });
          }}
          schema={schema}
        >
          {({ register, formState, watch }) => (
            <>
              <div className="grid grid-cols-2 gap-4">
                <InputField
                  label="製品名"
                  error={formState.errors.product_name}
                  registration={register("product_name")}
                />
                <InputField
                  label="型式"
                  error={formState.errors.model_name}
                  registration={register("model_name")}
                />
                <InputField
                  label="数量"
                  error={formState.errors?.amount}
                  registration={register("amount", {
                    valueAsNumber: true,
                  })}
                  type="tel"
                />
                <SelectField
                  label="数量単位"
                  error={formState.errors?.amount_unit}
                  registration={register("amount_unit")}
                  options={formatVersatilityOption(versatilityQuery)}
                />
                <InputField
                  label="単価"
                  error={formState.errors?.unit_price}
                  registration={register("unit_price", {
                    valueAsNumber: true,
                  })}
                  type="tel"
                />
                <div className="flex justify-center items-center">
                  {getAmountPrice(watch())}
                </div>
                <InputField
                  label="備考"
                  error={formState.errors?.remarks}
                  registration={register("remarks")}
                />
              </div>
            </>
          )}
        </Form>
      </FormDrawer>
    </Authorization>
  );
};
