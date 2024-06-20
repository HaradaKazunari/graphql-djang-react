import { Button } from "@/components/Elements";
import { Authorization, ROLES } from "@/lib/authorization";

import { useDownloadDelivery } from "../api";

type DownloadDeliveryProps = {
  project_id: string;
  disabled: boolean;
};

export const DownloadDelivery = ({
  project_id,
  disabled,
}: DownloadDeliveryProps) => {
  const DownloadDeliveryMutate = useDownloadDelivery();

  return (
    <Authorization allowedRoles={[ROLES.ADMIN]}>
      <Button
        disabled={disabled}
        size="sm"
        variant="primary"
        onClick={() => {
          DownloadDeliveryMutate.mutate({
            project_id,
          });
        }}
      >
        納品書
        <br />
        ダウンロード
      </Button>
    </Authorization>
  );
};
