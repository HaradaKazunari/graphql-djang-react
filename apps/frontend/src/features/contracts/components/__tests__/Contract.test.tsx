import {
  screen,
  test,
  expect,
  rtlRender,
  waitForLoadingToFinish,
  createContract,
} from "@/test/test-utils";

import { AppProvider } from "@/providers/app";
import { ContractDetail } from "..";
import { formatDate } from "@/utils/format";
import { SHOW_DATE_FORMATE } from "@/config";

const contract = createContract();
test("should render contract", async () => {
  rtlRender(<ContractDetail contract_id={contract.contract_id} />, {
    wrapper: AppProvider,
  });
  await waitForLoadingToFinish();

  expect(
    screen.getAllByText(
      "納品予定日：" +
        formatDate(contract.delivery_schedule_date, SHOW_DATE_FORMATE),
    ),
  ).toHaveLength(1);
  expect(
    screen.getAllByText(
      "請求予定日：" +
        formatDate(contract.invoice_schedule_date, SHOW_DATE_FORMATE),
    ),
  ).toHaveLength(1);
  expect(
    screen.getAllByText(
      "納品日：" + formatDate(contract.delivery_date, SHOW_DATE_FORMATE),
    ),
  ).toHaveLength(1);
  expect(
    screen.getAllByText(
      "請求日：" + formatDate(contract.invoice_date, SHOW_DATE_FORMATE),
    ),
  ).toHaveLength(1);
  expect(screen.getAllByText("注番：" + contract.order_no)).toHaveLength(1);
});
