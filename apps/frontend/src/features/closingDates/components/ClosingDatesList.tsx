import dayjs from "dayjs";
import { Table, Spinner } from "@/components/Elements";
import { DATE_FORMATE, SHOW_DATE_FORMATE, SHOW_YM_FORMATE } from "@/config";
import { formatDate } from "@/utils/format";
import { useClosingDates } from "../api";
import { ClosingDate } from "../types";
import { UpdateClosingDate, CreateClosingDate, CancelClosingDate } from "./";

export const ClosingDatesList = () => {
  const closingDateQuery = useClosingDates();

  if (closingDateQuery.isPending) {
    return (
      <div className="w-full h-48 flex justify-center items-center">
        <Spinner size="lg" />
      </div>
    );
  }

  if (!closingDateQuery.data) return null;

  const getLastClosingYm = () => {
    const format = DATE_FORMATE;
    const closing_ym = closingDateQuery.data[0]?.closing_ym;
    if (!closing_ym) return dayjs().set("date", 1).format(format);

    const date = dayjs(closing_ym).set("date", 1).add(1, "month");
    return date.format(format);
  };

  return (
    <Table<ClosingDate>
      data={[
        {
          id: "",
          closing_ym: getLastClosingYm(),
        },
        ...closingDateQuery.data,
      ]}
      columns={[
        {
          title: "締め対象年月",
          field: "closing_ym",
          Cell: ({ entry: { closing_ym } }) => {
            return (
              <div className="text-center">
                {formatDate(closing_ym, SHOW_YM_FORMATE)}
              </div>
            );
          },
        },
        {
          title: "確定日",
          field: "closing_fixed_date",
          Cell: ({ entry: { closing_fixed_date } }) => {
            if (!closing_fixed_date) return <></>;
            return (
              <div className="text-center">
                {formatDate(closing_fixed_date, SHOW_DATE_FORMATE)}
              </div>
            );
          },
        },
        {
          title: "",
          field: "id",
          Cell: ({ entry: { id, closing_ym, closing_fixed_date } }) => {
            if (closing_fixed_date) {
              return <></>;
            }
            return (
              <div className="flex justify-center">
                {id ? (
                  <UpdateClosingDate closing_date_id={id} />
                ) : (
                  <CreateClosingDate closing_ym={closing_ym} />
                )}
              </div>
            );
          },
        },
        {
          title: "",
          field: "id",
          Cell({ entry: { id, closing_fixed_date } }) {
            if (closing_fixed_date) {
              return (
                <div className="flex justify-center">
                  <CancelClosingDate closing_date_id={id} />
                </div>
              );
            }
            return <></>;
          },
        },
      ]}
    />
  );
};
