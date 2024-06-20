import {
  screen,
  userEvent,
  test,
  expect,
  rtlRender,
  waitForLoadingToFinish,
  createEstimate,
} from "@/test/test-utils";

import { AppProvider } from "@/providers/app";
import { UpdateEstimate } from "..";
import { DATE_INVALID, REQUIRED } from "@/utils/validate";

const estimate = createEstimate();

const accrual_date = "2024-01-01";
const accrual_place = "メール";
const estimate_validity_period = "1ヶ月";
const delivery_date = "1ヶ月後";
const delivery_place = "倉庫";
const transaction_condition = "条件";

test("should set default value", async () => {
  rtlRender(<UpdateEstimate estimate_id={estimate.estimate_id} />, {
    wrapper: AppProvider,
  });
  await waitForLoadingToFinish();

  await userEvent.click(screen.getByRole("button", { name: "編集" }));

  expect(screen.getAllByText("見積情報 編集"));

  expect(screen.getByLabelText("発注日").value).toEqual(estimate.accrual_date);
  expect(screen.getByLabelText("発注場所").value).toEqual(
    estimate.accrual_place,
  );
  expect(screen.getByLabelText("納期").value).toEqual(estimate.delivery_date);
  expect(screen.getByLabelText("納入場所").value).toEqual(
    estimate.delivery_place,
  );
  expect(screen.getByLabelText("見積有効期限").value).toEqual(
    estimate.estimate_validity_period,
  );
  expect(screen.getByLabelText("取引条件").value).toEqual(
    estimate.transaction_condition,
  );
});

test("should success to update estimate data", async () => {
  rtlRender(<UpdateEstimate estimate_id={estimate.estimate_id} />, {
    wrapper: AppProvider,
  });

  await userEvent.click(screen.getByRole("button", { name: "編集" }));

  await userEvent.clear(screen.getByLabelText("発注日"));

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

  await userEvent.click(screen.getByRole("button", { name: "確定" }));

  expect(screen.getAllByText("見積情報を更新しました")).toHaveLength(1);
});

test("should show validation error of required", async () => {
  rtlRender(<UpdateEstimate estimate_id={estimate.estimate_id} />, {
    wrapper: AppProvider,
  });
  await userEvent.click(screen.getByRole("button", { name: "編集" }));

  await userEvent.clear(screen.getByLabelText("発注日"));
  await userEvent.clear(screen.getByLabelText("発注場所"));
  await userEvent.clear(screen.getByLabelText("見積有効期限"));
  await userEvent.clear(screen.getByLabelText("納期"));
  await userEvent.clear(screen.getByLabelText("納入場所"));

  await userEvent.click(screen.getByRole("button", { name: "確定" }));
  expect(screen.getAllByRole("alert", { name: REQUIRED })).toHaveLength(4);
});

test("should show validation error of date", async () => {
  rtlRender(<UpdateEstimate estimate_id={estimate.estimate_id} />, {
    wrapper: AppProvider,
  });

  await userEvent.click(screen.getByRole("button", { name: "編集" }));

  await userEvent.clear(screen.getByLabelText("発注日"));

  await userEvent.click(screen.getByRole("button", { name: "確定" }));

  expect(screen.getAllByText(DATE_INVALID)).toHaveLength(1);
});
