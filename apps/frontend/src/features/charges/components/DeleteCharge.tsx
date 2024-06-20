import { Button, ConfirmationDialog } from "@/components/Elements";

import { useDeleteCharge } from "../api/deleteCharge";

type DeleteUserProps = {
  id: string;
};

export const DeleteCharge = ({ id }: DeleteUserProps) => {
  const deleteChargeMutation = useDeleteCharge();

  return (
    <ConfirmationDialog
      icon="danger"
      title="担当者 削除"
      body="本当に削除しますか？"
      triggerButton={<Button variant="danger">削除</Button>}
      confirmButton={
        <Button
          isLoading={deleteChargeMutation.isPending}
          type="button"
          className="bg-red-600"
          onClick={() => deleteChargeMutation.mutate({ charge_id: id })}
        >
          削除
        </Button>
      }
    />
  );
};
