import { Button } from "@/components/Elements";

import { useCancelClosingDate } from "../api/cancelClosingDate";

type CancelClosingDateProps = {
  closing_date_id: string;
};

export const CancelClosingDate = ({
  closing_date_id,
}: CancelClosingDateProps) => {
  const CancelClosingDateMutation = useCancelClosingDate();

  return (
    <Button
      size="sm"
      variant="other"
      onClick={() => {
        CancelClosingDateMutation.mutate({
          closing_date_id,
        });
      }}
    >
      解除
    </Button>
  );
};
