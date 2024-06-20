import { ContentLayout } from "@/components/Layout";

import { CreateContractForm } from "@/features/contracts";
import { useNavigate } from "@/router";

export const CreateEstimate = () => {
  const navigate = useNavigate();
  return (
    <ContentLayout title="受注登録">
      <div className="mt-4">
        <CreateContractForm onSuccess={() => navigate("/app/projects")} />
      </div>
    </ContentLayout>
  );
};

export default CreateEstimate;
