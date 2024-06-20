import { HttpResponse, http } from "msw";

import { API_URL } from "@/config";
import { db } from "../db";

export const projectDetailHandlers = [
  http.get(`${API_URL}/projectdetail/`, ({ request }) => {
    const url = new URL(request.url);
    const project_id = url.searchParams.get("project_id");
    if (!project_id) {
      return HttpResponse.json(db.projectDetail.getAll());
    }

    const projectDetails = db.projectDetail.findMany({
      where: {
        project_id: {
          equals: project_id,
        },
      },
    });
    return HttpResponse.json(projectDetails);
  }),

  http.post(`${API_URL}/projectdetail/`, () => {
    return HttpResponse.json("success");
  }),

  http.get(`${API_URL}/projectdetail/:id/`, ({ params }) => {
    const { id } = params;
    if (!id) return HttpResponse.json();

    const projectDetails = db.projectDetail.findFirst({
      where: {
        id: {
          equals: id,
        },
      },
    });
    return HttpResponse.json(projectDetails);
  }),

  http.delete(`${API_URL}/projectdetail/:project_detail_id/`, () => {
    return HttpResponse.json("success");
  }),
];
