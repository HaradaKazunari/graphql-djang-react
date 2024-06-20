import {
  screen,
  test,
  userEvent,
  expect,
  rtlRender,
  waitForLoadingToFinish,
  createClosingDate,
} from "@/test/test-utils";
import { AppProvider } from "@/providers/app";

import { UpdateClosingDate } from "..";

const closing = createClosingDate();
test("should success to create closing date", async () => {
  rtlRender(<UpdateClosingDate closing_date_id={closing.id} />, {
    wrapper: AppProvider,
  });
  await waitForLoadingToFinish();

  await userEvent.click(screen.getByRole("button", { name: "確定" }));

  expect(screen.getAllByText("締め日を確定しました")).toHaveLength(1);
});
