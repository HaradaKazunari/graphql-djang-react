import { Button, ConfirmationDialog } from "@/components/Elements";
import { TrashIcon } from "@heroicons/react/24/solid";

import { useDeleteProjectDetail } from "../api/deleteProjectDetail";

type DeleteProjectDetailProps = {
  project_detail_id: string;
  project_id: string;
};

export const DeleteProjectDetail = ({
  project_detail_id,
  project_id,
}: DeleteProjectDetailProps) => {
  const deleteProjectDetailMutation = useDeleteProjectDetail({ project_id });

  return (
    <ConfirmationDialog
      icon="danger"
      title="明細削除"
      body="本当に削除しますか？"
      triggerButton={
        <div data-testid="detail-delete-button">
          <TrashIcon className="w-6 h-6 text-gray-500 cursor-pointer" />
        </div>
      }
      confirmButton={
        <Button
          isLoading={deleteProjectDetailMutation.isPending}
          type="button"
          className="bg-red-600"
          onClick={() =>
            deleteProjectDetailMutation.mutate({ project_detail_id })
          }
        >
          削除
        </Button>
      }
    />
  );
};
