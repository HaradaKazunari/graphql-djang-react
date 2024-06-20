import { Button, ConfirmationDialog } from "@/components/Elements";

import { useDeleteClient } from "../api/deleteClient";

type DeleteClientProps = {
  id: string;
};

export const DeleteClient = ({ id }: DeleteClientProps) => {
  const deleteClientMutation = useDeleteClient();

  return (
    <ConfirmationDialog
      icon="danger"
      title="取引先 削除"
      body="本当に削除しますか？"
      triggerButton={<Button variant="danger">削除</Button>}
      confirmButton={
        <Button
          isLoading={deleteClientMutation.isPending}
          type="button"
          className="bg-red-600"
          onClick={() => deleteClientMutation.mutate({ client_id: id })}
        >
          削除
        </Button>
      }
    />
  );
};
