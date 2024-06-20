import { HttpResponse, http } from "msw";

import { API_URL } from "@/config";
import { db } from "../db";

export const contractHandlers = [
  http.get(`${API_URL}/contract/`, () => {
    return HttpResponse.json(db.contract.getAll());
  }),

  http.post(`${API_URL}/contract/`, () => {
    return HttpResponse.json("success");
  }),

  http.get(`${API_URL}/contract/:contract_id/`, ({ params }) => {
    const { contract_id } = params;
    if (!contract_id) return HttpResponse.json();

    const contracts = db.contract.findFirst({
      where: {
        contract_id: {
          equals: contract_id,
        },
      },
    });
    return HttpResponse.json(contracts);
  }),

  http.patch(`${API_URL}/contract/:contract_id/`, () => {
    return HttpResponse.json("success");
  }),

  http.delete(`${API_URL}/contract/:contract_id/`, () => {
    return HttpResponse.json("success");
  }),
];
