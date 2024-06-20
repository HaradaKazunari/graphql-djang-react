import { Table, Spinner, Link, Button } from "@/components/Elements";

import { useUnclaimedProject } from "../api/getUnclaimedProject";
import { UnclaimedProject } from "../types";
import { formatDate, showPrice } from "@/utils/format";
import { SHOW_YM_FORMATE } from "@/config";

export const UnclaimedProjects = () => {
  const ProjectsQuery = useUnclaimedProject();

  if (ProjectsQuery.isLoading) {
    return (
      <div className="w-full h-48 flex justify-center items-center">
        <Spinner size="lg" />
      </div>
    );
  }

  if (!ProjectsQuery.data) return null;

  return (
    <Table<UnclaimedProject>
      data={ProjectsQuery.data}
      columns={[
        {
          title: "",
          field: "project_id",
          Cell: ({ entry: { project_id } }) => {
            return (
              <div className="flex justify-center">
                <Link to={`./projects/${project_id}`}>
                  <Button variant="info">詳細</Button>
                </Link>
              </div>
            );
          },
        },
        {
          title: "請求年月",
          field: "invoice_ym",
          Cell: ({ entry: { invoice_ym } }) => {
            return (
              <div className="text-center">
                {formatDate(invoice_ym, SHOW_YM_FORMATE)}
              </div>
            );
          },
        },
        {
          title: "案件名",
          field: "project_name",
        },
        {
          title: "取引先名",
          field: "client_name",
          Cell: ({ entry: { client_name } }) => {
            return <div className="text-center">{client_name}</div>;
          },
        },
        {
          title: "請求金額",
          field: "total_amount",
          Cell({ entry: { total_amount } }) {
            return <div className="text-center">{showPrice(total_amount)}</div>;
          },
        },
      ]}
    />
  );
};
