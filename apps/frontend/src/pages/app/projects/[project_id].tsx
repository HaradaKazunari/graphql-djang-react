import { useNavigate, useParams } from "react-router-dom";
import clsx from "clsx";
import dayjs from "dayjs";

import { Card, Spinner } from "@/components/Elements";
import { ContentLayout } from "@/components/Layout";

import { DeleteProject, useProject, UpdateProject } from "@/features/projects";
import { UpdateEstimate } from "@/features/estimates/components/UpdateEstimate";
import { UpdateContract, AddContract } from "@/features/contracts";
import {
  CreateProjectDetail,
  ProjectDetail,
  ProjectDetailsList,
  useProjectDetails,
} from "@/features/projectDetails";
import { formatDate } from "@/utils/format";
import { SHOW_DATE_FORMATE } from "@/config";
import { EstimateDetail } from "@/features/estimates";
import { ContractDetail, useContract } from "@/features/contracts";
import { DownloadEstimate, DownloadDelivery } from "@/features/document";

const cardRowStyle = "block text-sm font-medium text-gray-700";

export const Project = () => {
  const { project_id = "" } = useParams();

  const navigate = useNavigate();
  if (!project_id) navigate("..");

  const projectQuery = useProject({ project_id });
  const projectDetailQuery = useProjectDetails({ params: { project_id } });

  const contractQuery = useContract({
    contract_id: projectQuery.data?.contract_id,
  });

  if (projectQuery.isPending && projectDetailQuery.isPending) {
    return (
      <div className="w-full h-48 flex justify-center items-center">
        <Spinner size="lg" />
      </div>
    );
  }

  if (!projectQuery.data || !contractQuery.data) return null;

  const canEdit = contractQuery.data?.invoice_issued_date
    ? dayjs(contractQuery.data.invoice_issued_date).add(2, "month") > dayjs()
    : true;

  const projectDetails: ProjectDetail[] = projectDetailQuery.data || [];
  const isDisabledDLEstimate = !projectDetails.length;
  const isDisabledDLDelivery = !!(
    !projectDetails.length || !projectQuery.data?.contract_id
  );

  return (
    <>
      <ContentLayout title="案件詳細">
        <div className="flex justify-between items-center">
          <div className="flex items-center gap-6">
            <div className="text-xl mt-2">
              <UpdateProject project_id={project_id} />
            </div>
            <DownloadEstimate
              project_id={project_id}
              disabled={isDisabledDLEstimate}
            />
            <DownloadDelivery
              project_id={project_id}
              disabled={isDisabledDLDelivery}
            />
          </div>
          <DeleteProject project_id={project_id} disabled={!canEdit} />
        </div>
        <div className="mt-6 flex gap-6">
          <Card head="見積情報">
            {projectQuery.data?.estimate_id ? (
              <EstimateDetail estimate_id={projectQuery.data?.estimate_id}>
                {({ data }) => (
                  <>
                    <div className="grid grid-cols-2 gap-4">
                      <div className={clsx(cardRowStyle)}>
                        発生日：
                        {formatDate(data?.accrual_date, SHOW_DATE_FORMATE)}
                      </div>
                      <div className={clsx(cardRowStyle)}>
                        発生場所：{data?.accrual_place}
                      </div>
                      <div className={clsx(cardRowStyle)}>
                        納期：{data?.deadline}
                      </div>
                      <div className={clsx(cardRowStyle)}>
                        納入場所：{data?.estimate_validity_period}
                      </div>
                      <div className={clsx(cardRowStyle)}>
                        見積有効期限：{data?.estimate_validity_period}
                      </div>
                      <div className={clsx(cardRowStyle)}>
                        取引条件：{data?.transaction_condition}
                      </div>
                    </div>
                    <div className="flex justify-end mt-4">
                      <UpdateEstimate
                        estimate_id={data?.estimate_id}
                        disabled={!canEdit}
                      />
                    </div>
                  </>
                )}
              </EstimateDetail>
            ) : (
              <span>見積情報はありません</span>
            )}
          </Card>
          <Card head="受注情報">
            {projectQuery.data?.contract_id ? (
              <>
                <ContractDetail contract_id={projectQuery.data?.contract_id}>
                  {({ data }) => (
                    <>
                      <div className="grid grid-cols-2 gap-4">
                        <div className={clsx(cardRowStyle)}>
                          納品予定日：
                          {formatDate(
                            data?.delivery_schedule_date,
                            SHOW_DATE_FORMATE
                          )}
                        </div>
                        <div className={clsx(cardRowStyle)}>
                          請求予定日：
                          {formatDate(
                            data?.invoice_schedule_date,
                            SHOW_DATE_FORMATE
                          )}
                        </div>
                        <div className={clsx(cardRowStyle)}>
                          納品日：
                          {formatDate(
                            data?.delivery_issued_date,
                            SHOW_DATE_FORMATE
                          )}
                        </div>
                        <div className={clsx(cardRowStyle)}>
                          請求日：
                          {formatDate(
                            data?.invoice_issued_date,
                            SHOW_DATE_FORMATE
                          )}
                        </div>
                        <div className={clsx(cardRowStyle)}>
                          注番：{data?.order_no}
                        </div>
                      </div>
                      <div className="flex justify-end mt-4">
                        <UpdateContract
                          contract_id={data?.contract_id}
                          disabled={!canEdit}
                        />
                      </div>
                    </>
                  )}
                </ContractDetail>
              </>
            ) : (
              <>
                <span>契約情報はありません</span>
                <div className="flex justify-end mt-4">
                  <AddContract project_id={project_id} />
                </div>
              </>
            )}
          </Card>
        </div>
        <div className="mt-6">
          <ProjectDetailsList project_id={project_id} canEdit={canEdit} />
        </div>
        <div className="mt-6 flex justify-center">
          <CreateProjectDetail project_id={project_id} disabled={!canEdit} />
        </div>
      </ContentLayout>
    </>
  );
};
export default Project;
