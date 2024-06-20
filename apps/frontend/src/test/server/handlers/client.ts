import { HttpResponse, http } from "msw";

import { API_URL } from "@/config";
import { db } from "../db";

export const clientHandlers = [
  http.get(`${API_URL}/client/`, () => {
    return HttpResponse.json(db.client.getAll());
  }),

  http.post(`${API_URL}/client/`, () => {
    return HttpResponse.json("success");
  }),

  http.get(`${API_URL}/client/:client_id/`, ({ params }) => {
    const { client_id } = params;
    if (!client_id) return HttpResponse.json();

    const client = db.client.findFirst({
      where: {
        client_id: {
          equals: client_id,
        },
      },
    });
    return HttpResponse.json(client);
  }),

  http.patch(`${API_URL}/client/:client_id/`, () => {
    return HttpResponse.json("success");
  }),

  http.delete(`${API_URL}/client/:client_id/`, () => {
    return HttpResponse.json("success");
  }),
];
