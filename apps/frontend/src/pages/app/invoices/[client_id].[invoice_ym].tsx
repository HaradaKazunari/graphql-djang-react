import { useNavigate, useParams } from "react-router-dom";
import { Spinner, Button, Link } from "@/components/Elements";

import { ContentLayout } from "@/components/Layout";
import { useInvoice } from "@/features/invoices";
import { ProjectDetailsList } from "@/features/projectDetails";
import { formatDate } from "@/utils/format";
import { DownloadInvoice } from "@/features/document";

export const Invoice = () => {
  const { client_id = "", invoice_ym = "" } = useParams();
  const navigate = useNavigate();
  if (!client_id || !invoice_ym) navigate("..");

  const invoiceQuery = useInvoice({ client_id, invoice_ym });

  if (invoiceQuery.isPending) {
    return (
      <div className="w-full h-48 flex justify-center items-center">
        <Spinner size="lg" />
      </div>
    );
  }

  if (!invoiceQuery.data) return null;

  return (
    <ContentLayout title="請求詳細">
      <div className="mt-4">
        <DownloadInvoice client_id={client_id} invoice_ym={invoice_ym} />
      </div>
      <div className="mt-4">
        <div className="text-xl">取引先名：{invoiceQuery.data.client_name}</div>
        <div className="text-xl">
          請求年月：{formatDate(invoice_ym, "YYYY年MM月")}
        </div>
      </div>
      {invoiceQuery.data?.projects &&
        invoiceQuery.data?.projects.map((project) => (
          <div key={project.project_id} className="mt-8">
            <div className="flex gap-4 items-center my-4">
              <div className="text-xl">案件名：{project.project_name}</div>
              <Link to={`/app/projects/${project.project_id}`}>
                <Button type="submit" className="w-fit">
                  編集
                </Button>
              </Link>
            </div>
            <ProjectDetailsList
              project_id={project.project_id}
              canEdit={false}
            />
          </div>
        ))}
    </ContentLayout>
  );
};
export default Invoice;
