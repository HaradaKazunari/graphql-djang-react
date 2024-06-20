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

import { CancelClosingDate } from "..";

const closing = createClosingDate();
test("should success to cancel closing date", async () => {
  rtlRender(<CancelClosingDate closing_date_id={closing.id} />, {
    wrapper: AppProvider,
  });
  await waitForLoadingToFinish();

  await userEvent.click(screen.getByRole("button", { name: "解除" }));

  expect(screen.getAllByText("締め日をキャンセルしました")).toHaveLength(1);
});
