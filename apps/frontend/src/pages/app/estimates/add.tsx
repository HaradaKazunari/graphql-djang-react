import { useNavigate } from "react-router-dom";
import { ContentLayout } from "@/components/Layout";

import { CreateEstimateForm } from "@/features/estimates";

export const CreateEstimate = () => {
  const navigate = useNavigate();
  return (
    <ContentLayout title="見積登録">
      <div className="mt-4">
        <CreateEstimateForm onSuccess={() => navigate("/app/projects")} />
      </div>
    </ContentLayout>
  );
};

export default CreateEstimate;
