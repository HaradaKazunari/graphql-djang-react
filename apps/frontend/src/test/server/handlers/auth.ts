import { HttpResponse, http } from "msw";

import { API_URL } from "@/config";

type LoginBody = {
  username: string;
  password: string;
};

export const authHandlers = [
  http.post<LoginBody>(`${API_URL}/login`, async () => {
    return HttpResponse.json({
      username: "admin",
    });
  }),

  http.get(`${API_URL}/check-auth`, () => {
    return HttpResponse.json({
      username: "admin",
    });
  }),
];
