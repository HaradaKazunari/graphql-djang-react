import { Table, Spinner, Link, Button } from "@/components/Elements";
import { GetVersatilityValue } from "@/utils/versatility";

import { useClients } from "../api/getClients";
import { Client } from "../types";
import { DeleteClient } from "./DeleteClient";

export const ClientsList = () => {
  const clientQuery = useClients();

  if (clientQuery.isPending) {
    return (
      <div className="w-full h-48 flex justify-center items-center">
        <Spinner size="lg" />
      </div>
    );
  }

  if (!clientQuery.data) return null;

  return (
    <Table<Client>
      isSorting
      isPager
      data={clientQuery.data}
      columns={[
        {
          title: "",
          field: "client_id",
          Cell: ({ entry: { client_id } }) => {
            return (
              <div className="flex justify-center">
                <Link to={`./${client_id}`}>
                  <Button variant="info">詳細</Button>
                </Link>
              </div>
            );
          },
        },
        {
          title: "取引先名",
          field: "company_name",
          Cell: ({ entry: { company_name } }) => {
            return <div className="flex justify-center">{company_name}</div>;
          },
        },
        {
          title: "所在地",
          field: "company_address",
        },
        {
          title: "締め区分",
          field: "created_date",
          Cell: ({ entry: { close_classification } }) => {
            return (
              <div className="text-center">
                {GetVersatilityValue(
                  "CLOSE_CLASSIFICATION",
                  close_classification
                )}
              </div>
            );
          },
        },
        {
          title: "",
          field: "client_id",
          Cell: ({ entry: { client_id } }) => {
            return (
              <div className="flex justify-center">
                <DeleteClient id={client_id} />
              </div>
            );
          },
        },
      ]}
    />
  );
};
