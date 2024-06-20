import { PencilIcon } from "@heroicons/react/24/solid";
import { Button } from "@/components/Elements";
import { Form, FormDrawer, InputField, SelectField } from "@/components/Form";
import { Authorization, ROLES } from "@/lib/authorization";
import { getValidateRule } from "@/utils/validate";
import { useVersatilitys } from "@/features/versatility";
import { formatVersatilityOption } from "@/utils/options";
import {
  useProjectDetail,
  UpdateProjectDetailDTO,
  useUpdateProjectDetail,
} from "../api";
import { getAmountPrice } from "../helper";

type UpdateProjectDetailProps = {
  project_detail_id: string;
  project_id: string;
};

const schema = getValidateRule([
  "product_name",
  "model_name",
  "amount",
  "amount_unit",
  "unit_price",
  "remarks",
]);

export const UpdateProjectDetail = ({
  project_detail_id,
  project_id,
}: UpdateProjectDetailProps) => {
  const projectDetailQuery = useProjectDetail({ project_detail_id });
  const updateProjectDetailMutation = useUpdateProjectDetail();
  const versatilityQuery = useVersatilitys({
    params: {
      identify_code: "UNIT",
    },
  });

  return (
    <Authorization allowedRoles={[ROLES.ADMIN]}>
      <FormDrawer
        isDone={updateProjectDetailMutation.isSuccess}
        triggerButton={
          <div data-testid="detail-edit-button">
            <PencilIcon className="h-4 w-4 cursor-pointer" />
          </div>
        }
        title="明細 編集"
        submitButton={
          <Button
            form="update-project-detail"
            type="submit"
            size="sm"
            isLoading={updateProjectDetailMutation.isPending}
          >
            確定
          </Button>
        }
      >
        <Form<UpdateProjectDetailDTO["data"], typeof schema>
          id="update-project-detail"
          onSubmit={(values) => {
            updateProjectDetailMutation.mutate({
              data: values,
              project_id,
              project_detail_id,
            });
          }}
          options={{
            defaultValues: {
              product_name: projectDetailQuery.data?.product_name,
              model_name: projectDetailQuery.data?.model_name,
              amount: projectDetailQuery.data?.amount,
              amount_unit: projectDetailQuery.data?.amount_unit,
              unit_price: projectDetailQuery.data?.unit_price,
              remarks: projectDetailQuery.data?.remarks,
            },
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
                  type="number"
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
                  type="number"
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
