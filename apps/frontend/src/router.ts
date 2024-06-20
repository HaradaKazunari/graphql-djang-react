// Generouted, changes to this file will be overriden
/* eslint-disable */

import { components, hooks, utils } from "@generouted/react-router/client";

export type Path =
  | `/`
  | `/app`
  | `/app/clients`
  | `/app/clients/:client_id`
  | `/app/closing-date`
  | `/app/contracts/add`
  | `/app/employees`
  | `/app/estimates/add`
  | `/app/invoices`
  | `/app/invoices/:client_id/:invoice_ym`
  | `/app/projects`
  | `/app/projects/:project_id`
  | `/login`;

export type Params = {
  "/app/clients/:client_id": { client_id: string };
  "/app/invoices/:client_id/:invoice_ym": {
    client_id: string;
    invoice_ym: string;
  };
  "/app/projects/:project_id": { project_id: string };
};

export type ModalPath = never;

export const { Link, Navigate } = components<Path, Params>();
export const { useModals, useNavigate, useParams } = hooks<
  Path,
  Params,
  ModalPath
>();
export const { redirect } = utils<Path, Params>();
