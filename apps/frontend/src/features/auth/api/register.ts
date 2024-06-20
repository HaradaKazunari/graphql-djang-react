import { axios } from "@/lib/axios";

import { UserResponse } from "../types";

export type RegisterCredentialsDTO = {
  username: string;
  password: string;
  firstName: string;
  lastName: string;
};

export const registerWithUserNameAndPassword = (
  data: RegisterCredentialsDTO,
): Promise<UserResponse> => {
  return axios.post("/auth/register", data);
};
