import { saveAs } from "file-saver";
import { useMutation } from "@tanstack/react-query";

import { axios } from "@/lib/axios";
import { MutationConfig } from "@/lib/react-query";
import dayjs from "dayjs";

export type DownloadEstimateDTO = {
  project_id: string;
};

export const downloadEstimate = async ({
  project_id,
}: DownloadEstimateDTO): Promise<void> => {
  return axios
    .post(`/estimate/issue/`, { project: project_id }, { responseType: "blob" })
    .then((res) => {
      // @ts-ignore
      const blob = new Blob([res], { type: "application/pdf" });
      const now = dayjs().format("YYYY年MM月DD日");
      saveAs(blob, `見積書_${now}.pdf`);
    });
};

type UseDownloadEstimateOptions = {
  config?: MutationConfig<typeof downloadEstimate>;
};

export const useDownloadEstimate = ({
  config,
}: UseDownloadEstimateOptions = {}) => {
  return useMutation({
    ...config,
    mutationFn: downloadEstimate,
  });
};
