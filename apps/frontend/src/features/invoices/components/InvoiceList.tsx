import { Spinner, Link, Button, FilterTable } from "@/components/Elements";

import { useInvoices } from "../api/getInvoices";
import { Invoice } from "../types";

import { comma, formatDate } from "@/utils/format";
import { SHOW_YM_FORMATE } from "@/config";

import { GetVersatilityValue } from "@/utils/versatility";

export const InvoicesList = ({ filterTerms = {} }) => {
  const invoicesQuery = useInvoices();

  if (invoicesQuery.isLoading) {
    return (
      <div className="w-full h-48 flex justify-center items-center">
        <Spinner size="lg" />
      </div>
    );
  }

  if (!invoicesQuery.data) return null;

  return (
    <FilterTable<Invoice>
      isSorting
      isPager
      filterTerms={filterTerms}
      data={invoicesQuery.data}
      columns={[
        {
          title: "",
          field: "client_id",
          Cell: ({ entry: { client_id, invoice_ym } }) => {
            return (
              <div className="flex justify-center">
                <Link to={`./${client_id}/${invoice_ym}`}>
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
          title: "取引先名",
          field: "client_name",
          Cell: ({ entry: { client_name } }) => {
            return <div className="text-center">{client_name}</div>;
          },
        },
        {
          title: "締め区分",
          field: "close_classification",
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
          title: "案件数",
          field: "project_count",
          Cell({ entry: { project_count } }) {
            return <div className="text-center">{comma(project_count)}件</div>;
          },
        },
      ]}
    />
  );
};
