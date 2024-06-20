import { ContentLayout } from "@/components/Layout";
import { Authorization, ROLES } from "@/lib/authorization";

import { ClosingDatesList } from "@/features/closingDates";

export const ClosingDates = () => {
  return (
    <ContentLayout title="締め日管理">
      <div className="mt-4">
        <Authorization allowedRoles={[ROLES.ADMIN]}>
          <ClosingDatesList />
        </Authorization>
      </div>
    </ContentLayout>
  );
};

export default ClosingDates;
