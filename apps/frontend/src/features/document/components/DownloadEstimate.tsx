import { Button } from "@/components/Elements";
import { Authorization, ROLES } from "@/lib/authorization";

import { useDownloadEstimate } from "../api";

type DownloadEstimateProps = {
  project_id: string;
  disabled?: boolean;
};

export const DownloadEstimate = ({
  project_id,
  disabled,
}: DownloadEstimateProps) => {
  const DownloadEstimateMutate = useDownloadEstimate();

  return (
    <Authorization allowedRoles={[ROLES.ADMIN]}>
      <Button
        size="sm"
        variant="primary"
        disabled={disabled}
        onClick={() => {
          DownloadEstimateMutate.mutate({
            project_id,
          });
        }}
      >
        見積書
        <br />
        ダウンロード
      </Button>
    </Authorization>
  );
};
