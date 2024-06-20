import { Option } from "@/components/Form";
import { Charge } from "@/features/charges";
import { Client } from "@/features/clients";
import { Versatility } from "@/features/versatility/types";
import { UseQueryResult } from "@tanstack/react-query";

type Query<T> = UseQueryResult<T[]>;

type FormatQueryOption<T> = {
  query: Query<T>;
  value_key: keyof T;
  label_key: keyof T;
};
export const formatQueryOption = <T>({
  query,
  value_key,
  label_key,
}: FormatQueryOption<T>): Option[] => {
  if (!Array.isArray(query.data)) return [];

  const getLabelValue = (d: T, key: keyof T): string | number => {
    if (Array.isArray(key)) {
      return key.map((k: keyof T) => d[k]).join(" ");
    }
    return d[key] as string | number;
  };

  const options = query.data?.map((d) => ({
    label: getLabelValue(d, label_key),
    value: getLabelValue(d, value_key),
  }));

  return [...options];
};

export const formatVersatilityOption = (
  query: Query<Versatility>
): Option[] => {
  return formatQueryOption({
    query,
    value_key: "key",
    label_key: "value",
  });
};

export const getChargeWithClientCompanyName = ({
  clientsQuery,
  chargesQuery,
  value_key = "charge_id",
  label_key = "charge_name",
}: {
  clientsQuery: Query<Client>;
  chargesQuery: Query<Charge>;
  value_key?: keyof Charge;
  label_key?: keyof Charge;
}) => {
  const options = formatQueryOption<Charge>({
    query: chargesQuery,
    value_key,
    label_key,
  });
  return options.map((option) =>
    addClientCompanyName({ option, clientsQuery, chargesQuery })
  );
};

export const addClientCompanyName = ({
  option,
  clientsQuery,
  chargesQuery,
}: {
  option: Option;
  clientsQuery: Query<Client>;
  chargesQuery: Query<Charge>;
}) => {
  const charge_id = option.value;

  if (!chargesQuery.data || !clientsQuery.data || !charge_id) {
    return option;
  }

  const charge = chargesQuery.data.find((d) => d.charge_id === charge_id);
  if (!charge) return option;

  const client = clientsQuery.data.find((d) => d.client_id === charge.client);
  if (!client) return option;

  return {
    ...option,
    label: client.company_name + " " + charge.charge_name,
  };
};
