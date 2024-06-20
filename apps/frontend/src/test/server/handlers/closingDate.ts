import { HttpResponse, http } from "msw";

import { API_URL } from "@/config";
import { db } from "../db";

export const closingDateHandlers = [
  http.get(`${API_URL}/closing/`, () => {
    return HttpResponse.json(db.closingDate.getAll());
  }),

  http.post(`${API_URL}/closing/`, () => {
    return HttpResponse.json("success");
  }),

  http.post(`${API_URL}/closing/:closing_date_id/confirm/`, () => {
    return HttpResponse.json("success");
  }),

  http.post(`${API_URL}/closing/:closing_date_id/cancel/`, () => {
    return HttpResponse.json("success");
  }),
];
