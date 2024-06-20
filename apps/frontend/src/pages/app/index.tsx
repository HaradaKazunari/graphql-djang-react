import { ContentLayout } from "@/components/Layout";
import { UnclaimedProjects } from "@/features/projects";

export const Dashboard = () => {
  return (
    <ContentLayout title="今回未請求一覧">
      <div className="mt-6">
        <UnclaimedProjects />
      </div>
    </ContentLayout>
  );
};
export default Dashboard;
