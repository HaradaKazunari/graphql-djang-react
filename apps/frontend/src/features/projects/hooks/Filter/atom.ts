import { atom } from "recoil";

export const projectFilterAtom = atom({
  key: "project-filter-state",
  default: {
    project_name: "",
    client_name: "",
    min_delivery_schedule_date: "",
    max_delivery_schedule_date: "",
    is_delivered: false,
    is_invoiced: false,
  },
});
