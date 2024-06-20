import { axios } from "@/lib/axios";

import { UserResponse } from "../types";

export type LoginCredentialsDTO = {
  username: string;
  password: string;
};

export const loginWithUserNameAndPassword = (
  data: LoginCredentialsDTO
): Promise<UserResponse> => {
  return axios.post("/login/", data);
};
