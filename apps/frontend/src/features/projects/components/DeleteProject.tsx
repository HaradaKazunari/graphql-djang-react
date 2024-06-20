import { Button, ConfirmationDialog } from "@/components/Elements";
import { Authorization, ROLES } from "@/lib/authorization";

import { useDeleteProject } from "..";

export const DeleteProject = ({
  project_id,
  disabled = false,
}: {
  project_id: string;
  disabled: boolean;
}) => {
  const DeleteProjectMutate = useDeleteProject();

  return (
    <Authorization allowedRoles={[ROLES.ADMIN]}>
      <ConfirmationDialog
        icon="danger"
        title="案件削除"
        body="本当に削除しますか？"
        triggerButton={
          <Button variant="danger" disabled={disabled}>
            削除
          </Button>
        }
        confirmButton={
          <Button
            size="sm"
            variant="danger"
            onClick={() => {
              DeleteProjectMutate.mutate({
                project_id,
              });
            }}
          >
            削除
          </Button>
        }
      />
    </Authorization>
  );
};
