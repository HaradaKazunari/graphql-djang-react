import { HttpResponse, http } from "msw";

import { API_URL } from "@/config";
import { db } from "../db";

export const estimateHandlers = [
  http.get(`${API_URL}/estimate/`, () => {
    return HttpResponse.json(db.estimate.getAll());
  }),

  http.post(`${API_URL}/estimate/`, () => {
    return HttpResponse.json("success");
  }),

  http.get(`${API_URL}/estimate/:estimate_id/`, ({ params }) => {
    const { estimate_id } = params;
    if (!estimate_id) return HttpResponse.json();

    const estimate = db.estimate.findFirst({
      where: {
        estimate_id: {
          equals: estimate_id,
        },
      },
    });
    return HttpResponse.json(estimate);
  }),

  http.patch(`${API_URL}/estimate/:estimate_id/`, () => {
    return HttpResponse.json("success");
  }),

  http.delete(`${API_URL}/estimate/:estimate_id/`, () => {
    return HttpResponse.json("success");
  }),
];
