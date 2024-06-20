import {
  screen,
  test,
  userEvent,
  vitest,
  waitFor,
  expect,
  rtlRender,
  waitForLoadingToFinish,
} from "@/test/test-utils";
import { CreateCharge } from "../CreateCharge";
import { AppProvider } from "@/providers/app";
import { EMAIL_INVALID, MAX_STR_INVALID, REQUIRED } from "@/utils/validate";

const charge_name = "たんとうしゃ";
const email = "tet@test.com";

test("should success to create charge data and check rendering", async () => {
  const onSuccess = vitest.fn();
  rtlRender(<CreateCharge client_id="1" onSuccess={onSuccess} />, {
    wrapper: AppProvider,
  });
  await waitForLoadingToFinish();

  await userEvent.click(screen.getByRole("button", { name: "担当者登録" }));

  expect((await screen.findByText("担当者 登録")).textContent).toBe(
    "担当者 登録",
  );

  await userEvent.type(screen.getByLabelText("担当者"), charge_name);
  await userEvent.type(screen.getByLabelText("Eメール"), email);

  await userEvent.click(screen.getByRole("button", { name: "登録" }));

  expect((await screen.findByText("担当者を登録しました")).textContent).toBe(
    "担当者を登録しました",
  );

  await waitFor(() => expect(onSuccess).toHaveBeenCalledTimes(1));
});

test("should show validate error of required", async () => {
  rtlRender(<CreateCharge client_id="1" />, {
    wrapper: AppProvider,
  });

  await userEvent.click(screen.getByRole("button", { name: "担当者登録" }));
  await userEvent.click(screen.getByRole("button", { name: "登録" }));

  expect(screen.getAllByRole("alert", { name: REQUIRED })).toHaveLength(2);
});

test("should show validate error of max length charge name", async () => {
  const onSuccess = vitest.fn();
  rtlRender(<CreateCharge client_id="1" onSuccess={onSuccess} />, {
    wrapper: AppProvider,
  });

  await userEvent.click(screen.getByRole("button", { name: "担当者登録" }));
  await userEvent.type(
    screen.getByLabelText("担当者"),
    "123456789012345678901234567890123456789012345678901",
  );
  await userEvent.click(screen.getByRole("button", { name: "登録" }));

  expect(
    screen.getAllByRole("alert", { name: MAX_STR_INVALID.replace("%d", "50") }),
  ).toHaveLength(1);
});

test("should show validate error of email format", async () => {
  const onSuccess = vitest.fn();
  rtlRender(<CreateCharge client_id="1" onSuccess={onSuccess} />, {
    wrapper: AppProvider,
  });

  await userEvent.click(screen.getByRole("button", { name: "担当者登録" }));
  await userEvent.type(screen.getByLabelText("Eメール"), "test");
  await userEvent.click(screen.getByRole("button", { name: "登録" }));

  expect(screen.getAllByRole("alert", { name: EMAIL_INVALID })).toHaveLength(1);
});

test("should show validate error of max length charge email", async () => {
  const onSuccess = vitest.fn();
  rtlRender(<CreateCharge client_id="1" onSuccess={onSuccess} />, {
    wrapper: AppProvider,
  });

  await userEvent.click(screen.getByRole("button", { name: "担当者登録" }));
  await userEvent.type(
    screen.getByLabelText("Eメール"),
    "1234567890123456789012345678901234567890123456789012345678901234567890123456789012345678901234567890123456789012345678901234567890123456789012345678901234567890123456789012345678901234567890123456789012345678901234567890123456789012345678901234567890@test-test.com",
  );
  await userEvent.click(screen.getByRole("button", { name: "登録" }));

  expect(
    screen.getAllByRole("alert", {
      name: MAX_STR_INVALID.replace("%d", "254"),
    }),
  ).toHaveLength(1);
});
