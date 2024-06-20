import { worker } from "./browser";

export const initMocks = () => {
  if (import.meta.env.VITE_APP_API_MOCKING === "true") {
    worker.start();
  }
};
