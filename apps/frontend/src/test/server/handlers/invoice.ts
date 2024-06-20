import { HttpResponse, http } from "msw";

import { API_URL } from "@/config";
import { db } from "../db";

export const invoiceHandlers = [
  http.get(`${API_URL}/invoice/`, () => {
    return HttpResponse.json(db.invoice.getAll());
  }),

  http.get(`${API_URL}/invoice/:client_id/`, ({ params }) => {
    const { client_id } = params;
    if (!client_id) return HttpResponse.json();

    const invoices = db.invoice.findMany({
      where: {
        client_id: {
          equals: client_id,
        },
      },
    });
    return HttpResponse.json(invoices);
  }),
];
