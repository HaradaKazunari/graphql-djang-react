import { HttpResponse, http } from "msw";

import { API_URL } from "@/config";
import { db } from "../db";

export const projectHandlers = [
  http.get(`${API_URL}/project/`, () => {
    return HttpResponse.json(db.project.getAll());
  }),

  http.post(`${API_URL}/project/`, () => {
    return HttpResponse.json({
      project_id: 10,
    });
  }),

  http.get(`${API_URL}/project/:project_id/`, ({ params }) => {
    const { project_id } = params;
    if (!project_id) return HttpResponse.json();

    const projects = db.project.findMany({
      where: {
        client_id: {
          equals: project_id,
        },
      },
    });
    return HttpResponse.json(projects);
  }),

  http.delete(`${API_URL}/project/:project_id/`, () => {
    return HttpResponse.json("success");
  }),
];
