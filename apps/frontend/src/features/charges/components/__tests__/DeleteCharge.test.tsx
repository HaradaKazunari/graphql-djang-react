import {
  screen,
  test,
  userEvent,
  expect,
  rtlRender,
  waitForLoadingToFinish,
  createCharge,
} from "@/test/test-utils";
import { AppProvider } from "@/providers/app";
import { DeleteCharge } from "..";

const charge_id = "33";
const charge_name = "たんとうしゃ";
const email = "tet@test.com";

const charge = createCharge({
  charge_id,
  charge_name,
  email,
});

test("should success to delete charge", async () => {
  rtlRender(<DeleteCharge id={charge.charge_id} />, {
    wrapper: AppProvider,
  });
  await waitForLoadingToFinish();

  await userEvent.click(screen.getByRole("button", { name: "削除" }));

  expect(screen.getByText("担当者 削除").textContent).toBe("担当者 削除");

  await userEvent.click(screen.getByRole("button", { name: "削除" }));

  expect(screen.getByText("担当者を削除しました").textContent).toBe(
    "担当者を削除しました",
  );
});
