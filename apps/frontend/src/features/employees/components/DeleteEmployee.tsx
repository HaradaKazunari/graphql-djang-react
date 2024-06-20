import { Button, ConfirmationDialog } from "@/components/Elements";
import { useDeleteEmployee } from "../api";

type DeleteEmployeeProps = {
  id: string;
};

export const DeleteEmployee = ({ id }: DeleteEmployeeProps) => {
  const deleteEmployeeMutation = useDeleteEmployee();

  return (
    <ConfirmationDialog
      icon="danger"
      title="社員 削除"
      body="本当に削除しますか？"
      triggerButton={<Button variant="danger">削除</Button>}
      confirmButton={
        <Button
          isLoading={deleteEmployeeMutation.isPending}
          type="button"
          className="bg-red-600"
          onClick={() => deleteEmployeeMutation.mutate({ employee_id: id })}
        >
          削除
        </Button>
      }
    />
  );
};
