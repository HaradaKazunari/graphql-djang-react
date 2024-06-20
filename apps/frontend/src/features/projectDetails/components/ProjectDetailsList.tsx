import { Table, Spinner } from "@/components/Elements";
import { ProjectDetail } from "../types";
import { comma, showPrice } from "@/utils/format";
import { GetVersatilityValue } from "@/utils/versatility";
import { UpdateProjectDetail } from "./UpdateProjectDetail";
import { DeleteProjectDetail } from "./DeleteProjectDetail";
import { useProjectDetails } from "../api/getProjectDetails";

type ProjectDetailListType = {
  project_id: string;
  canEdit?: boolean;
};
export const ProjectDetailsList = ({
  project_id,
  canEdit,
}: ProjectDetailListType) => {
  const projectDetailQuery = useProjectDetails({ params: { project_id } });

  if (projectDetailQuery.isPending) {
    return (
      <div className="w-full h-48 flex justify-center items-center">
        <Spinner size="lg" />
      </div>
    );
  }

  if (!projectDetailQuery.data) return null;

  return (
    <Table<ProjectDetail>
      data={projectDetailQuery.data}
      columns={[
        {
          title: "製品名",
          field: "product_name",
        },
        {
          title: "型式",
          field: "model_name",
        },
        {
          title: "数量",
          field: "amount",
          Cell: ({ entry: { amount, amount_unit } }) => {
            return (
              <div className="text-center w-full">
                {comma(amount)}
                {GetVersatilityValue("UNIT", amount_unit)}
              </div>
            );
          },
        },
        {
          title: "単価",
          field: "unit_price",
          Cell: ({ entry: { unit_price } }) => {
            return (
              <div className="text-center w-full">{showPrice(unit_price)}</div>
            );
          },
        },
        {
          title: "金額",
          field: "total_amount",
          Cell: ({ entry: { amount, unit_price } }) => {
            if (!amount || !unit_price) return <></>;
            return (
              <div className="text-center w-full">
                {showPrice(amount * unit_price)}
              </div>
            );
          },
        },
        {
          title: "備考",
          field: "remarks",
        },
        {
          title: "",
          field: "id",
          Cell: ({ entry: { id } }) => {
            if (canEdit && id)
              return (
                <UpdateProjectDetail
                  project_detail_id={id}
                  project_id={project_id}
                />
              );
            return <></>;
          },
        },
        {
          title: "",
          field: "id",
          Cell: ({ entry: { id } }) => {
            if (canEdit && id)
              return (
                <DeleteProjectDetail
                  project_detail_id={id}
                  project_id={project_id}
                />
              );
            return <></>;
          },
        },
      ]}
    />
  );
};
