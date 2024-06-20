import {
  screen,
  test,
  userEvent,
  expect,
  rtlRender,
  waitForLoadingToFinish,
} from "@/test/test-utils";
import { AppProvider } from "@/providers/app";

import { CreateClosingDate } from "..";

test("should success to create closing date", async () => {
  rtlRender(<CreateClosingDate closing_ym={"2024-10-10"} />, {
    wrapper: AppProvider,
  });
  await waitForLoadingToFinish();

  await userEvent.click(screen.getByRole("button", { name: "確定" }));

  expect(screen.getAllByText("締め日を確定しました")).toHaveLength(1);
});
