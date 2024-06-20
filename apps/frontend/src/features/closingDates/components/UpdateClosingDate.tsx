import dayjs from "dayjs";
import { Button } from "@/components/Elements";
import { Authorization, ROLES } from "@/lib/authorization";
import { DATE_FORMATE } from "@/config";

import { useUpdateClosingDate } from "../api";

type UpdateClosingDateProps = {
  closing_date_id: string;
};

export const UpdateClosingDate = ({
  closing_date_id,
}: UpdateClosingDateProps) => {
  const updateClosingDateMutation = useUpdateClosingDate();

  return (
    <Authorization allowedRoles={[ROLES.ADMIN]}>
      <Button
        size="sm"
        onClick={() => {
          updateClosingDateMutation.mutate({
            closing_date_id,
            closing_fixed_date: dayjs().format(DATE_FORMATE),
          });
        }}
      >
        確定
      </Button>
    </Authorization>
  );
};
