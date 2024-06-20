import {
  render as rtlRender,
  screen,
  waitForElementToBeRemoved,
} from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { FunctionComponent } from "react";

import { AppProvider } from "@/providers/app";
import storage from "@/utils/storage";

import {
  chargeGenerator,
  clientGenerator,
  closingDateGenerator,
  contractGenerator,
  estimateGenerator,
  invoiceGenerator,
  projectGenerator,
  userGenerator,
  projectDetailGenerator,
} from "./data-generators";
import { db } from "./server/db";
import { authenticate } from "./server/utils";

export { MemoryRouter } from "react-router-dom";
export * from "@testing-library/react";
export * from "vitest";

export const createUser = (userProps?: any) => {
  const user = userGenerator(userProps);
  db.user.create({ ...user, password: user.password });
  return user;
};

export const createCharge = (chargeProps?: any) => {
  const charge = chargeGenerator({ ...chargeProps, client_id: "1" });
  db.charge.create(charge);
  return charge;
};

export const createClient = (clientProps?: any) => {
  const client = clientGenerator({ ...clientProps });
  db.client.create(client);
  return client;
};

export const createClosingDate = (closingProps?: any) => {
  const closing = closingDateGenerator({ ...closingProps });
  db.closingDate.create(closing);
  return closing;
};

export const createInvoice = (invoiceProps?: any) => {
  const invoice = invoiceGenerator({ ...invoiceProps });
  db.invoice.create(invoice);
  return invoice;
};

export const createProject = (projectProps?: any) => {
  const project = projectGenerator({ ...projectProps });
  db.project.create(project);
  return project;
};

export const createContract = (contractProps?: any) => {
  const contract = contractGenerator({ ...contractProps });
  db.contract.create(contract);
  return contract;
};

export const createEstimate = (estimateProps?: any) => {
  const estimate = estimateGenerator({ ...estimateProps });
  db.estimate.create(estimate);
  return estimate;
};

export const createProjectDetail = (detailProps?: any) => {
  const detail = projectDetailGenerator({ ...detailProps });
  db.projectDetail.create(detail);
  return detail;
};

export const loginAsUser = (user: any) => {
  const authUser = authenticate(user);
  storage.setToken(authUser.jwt);
  return authUser;
};

export const waitForLoadingToFinish = () =>
  waitForElementToBeRemoved(
    () => [
      ...screen.queryAllByTestId(/loading/i),
      ...screen.queryAllByText(/loading/i),
    ],
    { timeout: 4000 },
  );

const initializeUser = async (user: any) => {
  if (typeof user === "undefined") {
    return loginAsUser(createUser());
  } else if (user) {
    return loginAsUser(user);
  } else {
    return null;
  }
};

export { userEvent, rtlRender };

export const render = async (
  ui: any,
  { route = "/", user, ...renderOptions }: Record<string, any> = {},
) => {
  // if you want to render the app unauthenticated then pass "null" as the user
  user = await initializeUser(user);

  window.history.pushState({}, "Test page", route);

  const returnValue = {
    ...rtlRender(ui, {
      wrapper: AppProvider as FunctionComponent<unknown>,
      ...renderOptions,
    }),
    user,
  };

  await waitForLoadingToFinish();

  return returnValue;
};
