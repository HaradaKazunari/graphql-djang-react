import { saveAs } from "file-saver";
import { useMutation } from "@tanstack/react-query";

import { axios } from "@/lib/axios";
import { MutationConfig } from "@/lib/react-query";
import dayjs from "dayjs";
import { useNotificationStore } from "@/stores/notifications";

export type DownloadDeliveryDTO = {
  project_id: string;
};

export const downloadDelivery = async ({
  project_id,
}: DownloadDeliveryDTO): Promise<void> => {
  return axios
    .post(`/delivery/issue/`, { project: project_id }, { responseType: "blob" })
    .then((res) => {
      // @ts-ignore
      const blob = new Blob([res], { type: "application/pdf" });
      const now = dayjs().format("YYYY年MM月DD日");
      saveAs(blob, `納品書_${now}.pdf`);
    });
};

type UseDownloadDeliveryOptions = {
  config?: MutationConfig<typeof downloadDelivery>;
};

export const useDownloadDelivery = ({
  config,
}: UseDownloadDeliveryOptions = {}) => {
  const { addNotification } = useNotificationStore();

  return useMutation({
    onError: () => {
      addNotification({
        type: "error",
        title: "ダウンロードできませんでした",
      });
    },
    ...config,
    mutationFn: downloadDelivery,
  });
};
