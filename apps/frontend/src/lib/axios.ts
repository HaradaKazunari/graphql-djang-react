import Axios, { AxiosError, AxiosResponse } from "axios";

import { API_URL } from "@/config";
import { useNotificationStore } from "@/stores/notifications";
import storage from "@/utils/storage";
import { getCookie } from "@/utils/cookie";
import { useValidationStore } from "@/stores/validation";
import { resolveValidateResponse } from "@/utils/validate";

export const axios = Axios.create({
  baseURL: API_URL,
});

axios.interceptors.request.use((config) => {
  const token = storage.getToken();
  if (token) {
    config.headers.authorization = `${token}`;
  }
  config.headers["X-Csrftoken"] = getCookie("csrftoken");
  config.headers.Accept = "application/json";
  config.withCredentials = true;

  return config;
});

axios.interceptors.response.use(
  (response: AxiosResponse) => {
    return response.data;
  },
  (error: AxiosError<AxiosErrorType>) => {
    // NOTE: do not notification if http status 403
    const isNotShowNotification = error.response?.status === 403;

    if (!isNotShowNotification) {
      exceptionHandling(error);
    }

    return Promise.reject(error);
  }
);

export type AxiosErrorType = {
  status: number;
  msg?: string;
  result?: { [k: string]: string[] };
};

const exceptionHandling = (error: AxiosError<AxiosErrorType>) => {
  const message = error.response?.data?.msg;
  message &&
    useNotificationStore.getState().addNotification({
      type: "error",
      title: "Error",
      message,
    });

  const result = error.response?.data?.result;
  result &&
    useValidationStore
      .getState()
      .addValidations(resolveValidateResponse(result));
};
