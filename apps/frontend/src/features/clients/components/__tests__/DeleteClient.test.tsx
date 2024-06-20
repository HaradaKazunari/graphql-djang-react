import {
  screen,
  test,
  userEvent,
  expect,
  rtlRender,
  waitForLoadingToFinish,
  createClient,
} from "@/test/test-utils";
import { AppProvider } from "@/providers/app";
import { DeleteClient } from "..";

const client = createClient();

test("should success to delete charge", async () => {
  rtlRender(<DeleteClient id={client.client_id} />, {
    wrapper: AppProvider,
  });
  await waitForLoadingToFinish();

  await userEvent.click(screen.getByRole("button", { name: "削除" }));

  expect(screen.getByText("取引先 削除").textContent).toBe("取引先 削除");

  await userEvent.click(screen.getByRole("button", { name: "削除" }));

  expect(screen.getAllByText("取引先を削除しました")).toHaveLength(1);
});
