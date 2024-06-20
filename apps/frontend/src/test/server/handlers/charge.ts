import { HttpResponse, http } from "msw";

import { API_URL } from "@/config";
import { db } from "../db";

export const chargeHandlers = [
  http.get(`${API_URL}/charge/`, () => {
    return HttpResponse.json(db.charge.getAll());
  }),
  http.post(`${API_URL}/charge/`, () => {
    return HttpResponse.json("success");
  }),

  http.get(`${API_URL}/charge/:charge_id/`, ({ params }) => {
    const { charge_id } = params;
    if (!charge_id) return HttpResponse.json();

    const charge = db.charge.findFirst({
      where: {
        charge_id: {
          equals: charge_id,
        },
      },
    });
    return HttpResponse.json(charge);
  }),

  http.patch(`${API_URL}/charge/:charge_id/`, () => {
    return HttpResponse.json("success");
  }),

  http.delete(`${API_URL}/charge/:charge_id/`, () => {
    return HttpResponse.json("success");
  }),
];
