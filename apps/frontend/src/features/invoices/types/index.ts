import { Project } from "@/features/projects/types";
import { BaseEntity } from "@/types";

export type Invoice = {
  invoice_ym: string | Date;
  client_id: string;
  client_name: string;
  close_classification: string;
  project_count: number;
  projects?: Project[];
} & BaseEntity;
