import {
  screen,
  test,
  expect,
  rtlRender,
  waitForLoadingToFinish,
  createClosingDate,
} from "@/test/test-utils";
import { AppProvider } from "@/providers/app";

import { ClosingDatesList } from "..";
import { formatDate } from "@/utils/format";
import { SHOW_DATE_FORMATE, SHOW_YM_FORMATE } from "@/config";

const closing = createClosingDate();
const not_fixed_closing = createClosingDate({ closing_fixed_date: "" });

test("should render closing date", async () => {
  rtlRender(<ClosingDatesList />, {
    wrapper: AppProvider,
  });
  await waitForLoadingToFinish();

  expect(screen.getAllByText("締め対象年月")).toHaveLength(1);
  expect(screen.getAllByText("確定日")).toHaveLength(1);

  expect(
    screen.getAllByText(formatDate(closing.closing_ym, SHOW_YM_FORMATE)),
  ).toHaveLength(1);
  expect(
    screen.getAllByText(
      formatDate(closing.closing_fixed_date, SHOW_DATE_FORMATE),
    ),
  ).toHaveLength(1);

  expect(
    screen.getAllByText(
      formatDate(not_fixed_closing.closing_ym, SHOW_YM_FORMATE),
    ),
  ).toHaveLength(1);
  expect(
    screen.getAllByText(
      formatDate(not_fixed_closing.closing_fixed_date, SHOW_DATE_FORMATE),
    ),
  ).not.toHaveLength(1);

  expect(screen.getAllByRole("button", { name: "確定" })).not.toHaveLength(0);
  expect(screen.getAllByRole("button", { name: "解除" })).not.toHaveLength(0);
});
