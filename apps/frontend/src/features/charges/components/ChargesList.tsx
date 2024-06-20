import { Table, Spinner } from "@/components/Elements";

import { useCharges } from "../api/getCharges";
import { Charge } from "../types";
import { DeleteCharge } from "./DeleteCharge";
import { UpdateCharge } from "./UpdateCharge";

export const ChargesList = ({ client_id }: { client_id: string }) => {
  const chargeQuery = useCharges({ params: { client_id } });

  if (chargeQuery.isPending) {
    return (
      <div className="w-full h-48 flex justify-center items-center">
        <Spinner size="lg" />
      </div>
    );
  }

  if (!chargeQuery.data) return null;

  return (
    <Table<Charge>
      isPager
      data={chargeQuery.data}
      columns={[
        {
          title: "担当者",
          field: "charge_name",
          Cell: ({ entry: { charge_name } }) => {
            return <div className="text-center">{charge_name}</div>;
          },
        },
        {
          title: "Eメール",
          field: "email",
          Cell: ({ entry: { email } }) => {
            return <div className="text-center">{email}</div>;
          },
        },
        {
          title: "",
          field: "charge_id",
          Cell: ({ entry: { charge_id } }) => {
            return (
              <div className="flex justify-center">
                <UpdateCharge charge_id={charge_id} />
              </div>
            );
          },
        },
        {
          title: "",
          field: "charge_id",
          Cell: ({ entry: { charge_id } }) => {
            return (
              <div className="flex justify-center">
                <DeleteCharge id={charge_id} />
              </div>
            );
          },
        },
      ]}
    />
  );
};
