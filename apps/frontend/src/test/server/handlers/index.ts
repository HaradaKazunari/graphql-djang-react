import { authHandlers } from "./auth";
import { chargeHandlers } from "./charge";
import { clientHandlers } from "./client";
import { versatilityHandlers } from "./versatility";
import { closingDateHandlers } from "./closingDate";
import { invoiceHandlers } from "./invoice";
import { projectHandlers } from "./project";
import { contractHandlers } from "./contract";
import { estimateHandlers } from "./estimate";
import { projectDetailHandlers } from "./projectDetail";

export const handlers = [
  ...authHandlers,
  ...chargeHandlers,
  ...clientHandlers,
  ...versatilityHandlers,
  ...closingDateHandlers,
  ...invoiceHandlers,
  ...projectHandlers,
  ...contractHandlers,
  ...estimateHandlers,
  ...projectDetailHandlers,
];
