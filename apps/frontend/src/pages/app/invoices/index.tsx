import { Card } from "@/components/Elements";
import { ContentLayout } from "@/components/Layout";

import { InvoicesList, useInvoiceFilter } from "@/features/invoices";

export const Invoices = () => {
  const { FilterForm, filterTerms } = useInvoiceFilter();

  return (
    <ContentLayout title="請求一覧">
      <Card className="mt-4">
        <div className="text-xl text-gray-800 mb-6">検索条件</div>
        <FilterForm />
      </Card>
      <div className="mt-4">
        <InvoicesList filterTerms={filterTerms} />
      </div>
    </ContentLayout>
  );
};

export default Invoices;
