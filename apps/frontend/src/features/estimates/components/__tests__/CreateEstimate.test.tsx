import {
  screen,
  userEvent,
  test,
  expect,
  vitest,
  rtlRender,
  createCharge,
  waitForLoadingToFinish,
} from "@/test/test-utils";

import { CreateEstimateForm } from "../CreateEstimate";
import { AppProvider } from "@/providers/app";
import { DATE_INVALID, REQUIRED } from "@/utils/validate";

const project_name = "test案件";
const accrual_date = "2024-01-01";
const accrual_place = "メール";
const estimate_validity_period = "1ヶ月";
const delivery_date = "1ヶ月後";
const delivery_place = "倉庫";
const transaction_condition = "条件";

const charge = createCharge({
  client_id: "1",
});
test("should success to create estimate", async () => {
  const onSuccess = vitest.fn();

  rtlRender(<CreateEstimateForm onSuccess={onSuccess} />, {
    wrapper: AppProvider,
  });
  await waitForLoadingToFinish();

  await userEvent.type(screen.getByLabelText("案件名"), project_name);
  await userEvent.selectOptions(
    screen.getByRole("combobox", { name: "担当者" }),
    [charge.charge_name],
  );
  await userEvent.type(screen.getByLabelText("発注日"), accrual_date);
  await userEvent.type(screen.getByLabelText("発注場所"), accrual_place);
  await userEvent.type(
    screen.getByLabelText("見積有効期限"),
    estimate_validity_period,
  );
  await userEvent.type(screen.getByLabelText("納期"), delivery_date);
  await userEvent.type(screen.getByLabelText("納入場所"), delivery_place);
  await userEvent.type(
    screen.getByLabelText("取引条件"),
    transaction_condition,
  );

  await userEvent.click(screen.getByRole("button", { name: "登録" }));

  expect(onSuccess).toHaveBeenCalledTimes(1);

  expect(screen.getAllByText("見積もりを登録しました")).toHaveLength(1);
});

test("should show validation error of required", async () => {
  const onSuccess = vitest.fn();
  rtlRender(<CreateEstimateForm onSuccess={onSuccess} />, {
    wrapper: AppProvider,
  });
  await userEvent.click(screen.getByRole("button", { name: "登録" }));

  expect(screen.getAllByRole("alert", { name: REQUIRED })).toHaveLength(6);
});

test("should show validation error of date", async () => {
  const onSuccess = vitest.fn();
  rtlRender(<CreateEstimateForm onSuccess={onSuccess} />, {
    wrapper: AppProvider,
  });
  await userEvent.click(screen.getByRole("button", { name: "登録" }));

  expect(screen.getAllByRole("alert", { name: DATE_INVALID })).toHaveLength(1);
});
