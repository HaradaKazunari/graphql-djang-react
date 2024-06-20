import {
  screen,
  test,
  expect,
  rtlRender,
  waitForLoadingToFinish,
  createEstimate,
} from "@/test/test-utils";

import { AppProvider } from "@/providers/app";
import { EstimateDetail } from "..";
import { formatDate } from "@/utils/format";
import { SHOW_DATE_FORMATE } from "@/config";

const estimate = createEstimate();
test("should render estimate", async () => {
  rtlRender(<EstimateDetail estimate_id={estimate.estimate_id} />, {
    wrapper: AppProvider,
  });
  await waitForLoadingToFinish();

  expect(
    screen.getAllByText(
      "発生日：" + formatDate(estimate.accrual_date, SHOW_DATE_FORMATE),
    ),
  ).toHaveLength(1);
  expect(
    screen.getAllByText("発生場所：" + estimate.accrual_place),
  ).toHaveLength(1);
  expect(screen.getAllByText("納期：" + estimate.delivery_date)).toHaveLength(
    1,
  );
  expect(
    screen.getAllByText("納入場所：" + estimate.delivery_place),
  ).toHaveLength(1);
  expect(
    screen.getAllByText("見積有効期限：" + estimate.estimate_validity_period),
  ).toHaveLength(1);
  expect(
    screen.getAllByText("取引条件：" + estimate.transaction_condition),
  ).toHaveLength(1);
});
