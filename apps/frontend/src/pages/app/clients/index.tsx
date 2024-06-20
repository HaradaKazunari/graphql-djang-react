import { ContentLayout } from "@/components/Layout";
import { ClientsList, CreateClient } from "@/features/clients";
import { Authorization, ROLES } from "@/lib/authorization";

export const Clients = () => {
  return (
    <ContentLayout title="取引先一覧">
      <div className="flex justify-end">
        <CreateClient />
      </div>
      <div className="mt-4">
        <Authorization
          forbiddenFallback={<div>Only admin can view this.</div>}
          allowedRoles={[ROLES.ADMIN]}
        >
          <ClientsList />
        </Authorization>
      </div>
    </ContentLayout>
  );
};

export default Clients;
