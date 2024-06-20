import { useMutation } from "@tanstack/react-query";

import { axios } from "@/lib/axios";
import { MutationConfig, queryClient } from "@/lib/react-query";
import { useNotificationStore } from "@/stores/notifications";

import { Estimate, InputEstimate } from "../types";

export type UpdateEstimateDTO = {
  data: InputEstimate;
  estimate_id: string;
};

export const updateEstimate = ({
  data,
  estimate_id,
}: UpdateEstimateDTO): Promise<Estimate> => {
  return axios.patch(`/estimate/${estimate_id}/`, data);
};

type UseUpdateEstimateOptions = {
  config?: MutationConfig<typeof updateEstimate>;
};

export const useUpdateEstimate = ({
  config,
}: UseUpdateEstimateOptions = {}) => {
  const { addNotification } = useNotificationStore();

  return useMutation({
    onMutate: async (updatingEstimate: any) => {
      await queryClient.cancelQueries({
        queryKey: ["estimate", updatingEstimate?.estimate_id],
      });

      const previousEstimate = queryClient.getQueryData<Estimate>([
        "estimate",
        updatingEstimate?.estimate_id,
      ]);

      queryClient.setQueryData(["estimate", updatingEstimate?.estimate_id], {
        ...previousEstimate,
        ...updatingEstimate.data,
        id: updatingEstimate.estimate_id,
      });

      return { previousEstimate };
    },
    onError: (_, __, context: any) => {
      if (context?.previousEstimate) {
        queryClient.setQueryData(
          ["estimate", context.previousEstimate.estimate_id],
          context.previousEstimate,
        );
      }
    },
    onSuccess: (data) => {
      queryClient.refetchQueries({ queryKey: ["estimate", data.estimate_id] });
      addNotification({
        type: "success",
        title: "見積情報を更新しました",
      });
    },
    ...config,
    mutationFn: updateEstimate,
  });
};
