import * as React from "react";
import { Form, InputField, SelectField } from "@/components/Form";
import { Button } from "@/components/Elements";
import { formatVersatilityOption } from "@/utils/options";
import { formatDate } from "@/utils/format";

import { useVersatilitys } from "@/features/versatility";
import { Invoice } from "..";

export type InvoiceFilterDTO = {
  invoice_ym: string;
  client_name: string;
  close_classification: string;
};

export const useInvoiceFilter = () => {
  const [filterValue, setFilterValue] = React.useState<InvoiceFilterDTO>({
    invoice_ym: "",
    client_name: "",
    close_classification: "",
  });

  const filterTerms = {
    invoice_ym: (target: Invoice) => {
      if (!filterValue.invoice_ym) return true;
      return (
        formatDate(target.invoice_ym, "YYYY-MM") === filterValue.invoice_ym
      );
    },
    client_name: (target: Invoice) => {
      return target.client_name.match(filterValue.client_name);
    },
    close_classification: (target: Invoice) => {
      if (!filterValue.close_classification) return true;
      return target.close_classification === filterValue.close_classification;
    },
  };

  const FilterForm = () => {
    const versatilityQuery = useVersatilitys({
      params: {
        identify_code: "CLOSE_CLASSIFICATION",
      },
    });
    return (
      <Form<InvoiceFilterDTO>
        id="filter-invoice"
        options={{ defaultValues: filterValue }}
        onSubmit={setFilterValue}
      >
        {({ register }) => (
          <>
            <div className="flex gap-6">
              <InputField
                label="請求年月"
                registration={register("invoice_ym")}
                type="month"
              />
            </div>
            <div className="flex gap-6">
              <InputField
                label="取引先名"
                registration={register("client_name")}
              />
              <SelectField
                label="締め区分"
                registration={register("close_classification")}
                options={formatVersatilityOption(versatilityQuery)}
              />
            </div>
            <div className="flex justify-end">
              <Button type="submit" className="w-fit">
                検索
              </Button>
            </div>
          </>
        )}
      </Form>
    );
  };

  return { filterValue, FilterForm, filterTerms };
};
