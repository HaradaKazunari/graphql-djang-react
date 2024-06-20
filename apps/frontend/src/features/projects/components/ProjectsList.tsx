import { FilterTable, Spinner, Link, Checkbox } from "@/components/Elements";
import { Button } from "@/components/Elements";

import { useProjects } from "../api/getProjects";
import { Projects } from "../types";
import { SHOW_DATE_FORMATE } from "@/config";
import { formatDate } from "@/utils/format";
import { useCharges } from "@/features/charges/api/getCharges";

export const ProjectsList = ({ filterTerms = {} }) => {
  const projectsQuery = useProjects();
  const chargeQuery = useCharges();
  const getChargeName = (id: string | null | undefined) => {
    if (!chargeQuery.data || !id) return "";
    return chargeQuery.data?.find((d) => d.charge_id === id)?.charge_name;
  };

  if (projectsQuery.isLoading) {
    return (
      <div className="w-full h-48 flex justify-center items-center">
        <Spinner size="lg" />
      </div>
    );
  }

  if (!projectsQuery.data) return null;

  return (
    <>
      <FilterTable<Projects & { is_delivered?: Date; is_invoiced?: Date }>
        isSorting
        isPager
        filterTerms={filterTerms}
        data={projectsQuery.data}
        columns={[
          {
            title: "",
            field: "project_id",
            Cell({ entry: { project_id } }) {
              return (
                <div className="flex justify-center">
                  <Link to={`./${project_id}`}>
                    <Button variant="link">詳細</Button>
                  </Link>
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
            title: "担当者名",
            field: "charge",
            Cell: ({ entry: { charge } }) => {
              return <div className="text-center">{getChargeName(charge)}</div>;
            },
          },
          {
            title: "納品予定日",
            field: "delivery_schedule_date",
            Cell: ({ entry: { delivery_schedule_date } }) => {
              if (!delivery_schedule_date) return <></>;
              return (
                <div className="text-center">
                  {formatDate(delivery_schedule_date, SHOW_DATE_FORMATE)}
                </div>
              );
            },
          },
          {
            title: "納品済み",
            field: "is_delivered",
            Cell: ({ entry: { delivery_issued_date } }) => {
              const isCheck = delivery_issued_date ? true : false;
              return (
                <div className="flex justify-center">
                  <Checkbox disabled defaultChecked={isCheck} />
                </div>
              );
            },
          },
          {
            title: "請求済み",
            field: "is_invoiced",
            Cell: ({ entry: { invoice_issued_date } }) => {
              const isCheck = invoice_issued_date ? true : false;
              return (
                <div className="flex justify-center">
                  <Checkbox disabled defaultChecked={isCheck} />
                </div>
              );
            },
          },
        ]}
      />
    </>
  );
};
