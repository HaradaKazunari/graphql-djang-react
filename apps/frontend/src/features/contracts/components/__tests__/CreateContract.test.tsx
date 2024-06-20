import {
  screen,
  userEvent,
  test,
  expect,
  vitest,
  rtlRender,
  waitForLoadingToFinish,
  createCharge,
} from "@/test/test-utils";

import { CreateContractForm } from "../CreateContract";
import { AppProvider } from "@/providers/app";
import { DATE_INVALID, REQUIRED } from "@/utils/validate";

const project_name = "test案件";

const delivery_schedule_date = "2024-01-01";
const invoice_schedule_date = "2024-02-02";
const order_no = "メール:2024年";

const charge = createCharge({
  client_id: "1",
});
test("should success to create contract data", async () => {
  const onSuccess = vitest.fn();

  rtlRender(<CreateContractForm onSuccess={onSuccess} />, {
    wrapper: AppProvider,
  });
  await waitForLoadingToFinish();

  await userEvent.type(screen.getByLabelText("案件名"), project_name);
  await userEvent.selectOptions(
    screen.getByRole("combobox", { name: "担当者" }),
    [charge.charge_name],
  );
  await userEvent.type(
    screen.getByLabelText("納品予定日"),
    delivery_schedule_date,
  );
  await userEvent.type(
    screen.getByLabelText("請求予定日"),
    invoice_schedule_date,
  );
  await userEvent.type(screen.getByLabelText("注番"), order_no);

  await userEvent.click(screen.getByRole("button", { name: "登録" }));

  expect(onSuccess).toHaveBeenCalledTimes(1);
});

test("should show validation error of required", async () => {
  const onSuccess = vitest.fn();
  rtlRender(<CreateContractForm onSuccess={onSuccess} />, {
    wrapper: AppProvider,
  });
  await userEvent.click(screen.getByRole("button", { name: "登録" }));

  expect(screen.getAllByRole("alert", { name: REQUIRED })).toHaveLength(2);
});

test("should show validation error of date", async () => {
  const onSuccess = vitest.fn();
  rtlRender(<CreateContractForm onSuccess={onSuccess} />, {
    wrapper: AppProvider,
  });
  await userEvent.click(screen.getByRole("button", { name: "登録" }));

  expect(screen.getAllByRole("alert", { name: DATE_INVALID })).toHaveLength(2);
});
