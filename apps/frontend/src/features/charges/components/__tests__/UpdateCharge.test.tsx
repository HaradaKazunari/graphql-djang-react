import {
  screen,
  test,
  userEvent,
  vitest,
  waitFor,
  expect,
  rtlRender,
  createCharge,
  waitForLoadingToFinish,
} from "@/test/test-utils";
import { UpdateCharge } from "../UpdateCharge";
import { AppProvider } from "@/providers/app";
import { EMAIL_INVALID, MAX_STR_INVALID, REQUIRED } from "@/utils/validate";

const charge_id = "2";
const charge_name = "たんとうしゃ";
const email = "tet@test.com";

const charge = createCharge({
  charge_id,
  charge_name,
  email,
});

test("should set default values", async () => {
  rtlRender(<UpdateCharge charge_id={charge.charge_id} />, {
    wrapper: AppProvider,
  });
  await waitForLoadingToFinish();

  await userEvent.click(screen.getByRole("button", { name: "編集" }));

  expect(screen.getByLabelText("担当者").value).toBe(charge.charge_name);
  expect(screen.getByLabelText("Eメール").value).toBe(charge.email);
});

test("should success to update contract data", async () => {
  const onSuccess = vitest.fn();
  rtlRender(<UpdateCharge charge_id="1" onSuccess={onSuccess} />, {
    wrapper: AppProvider,
  });

  await userEvent.click(screen.getByRole("button", { name: "編集" }));

  expect((await screen.findByText("担当者 編集")).textContent).toBe(
    "担当者 編集",
  );

  await userEvent.type(screen.getByLabelText("担当者"), charge_name);
  await userEvent.type(screen.getByLabelText("Eメール"), email);

  await userEvent.click(screen.getByRole("button", { name: "確定" }));

  await waitFor(() => expect(onSuccess).toHaveBeenCalledTimes(1));
});

test("should show validate error of required", async () => {
  const onSuccess = vitest.fn();
  rtlRender(<UpdateCharge charge_id="1" onSuccess={onSuccess} />, {
    wrapper: AppProvider,
  });

  await userEvent.click(screen.getByRole("button", { name: "編集" }));
  await userEvent.clear(screen.getByLabelText("担当者"));
  expect(screen.getByLabelText("担当者").nodeValue).toBeNull();
  await userEvent.clear(screen.getByLabelText("Eメール"));
  expect(screen.getByLabelText("Eメール").nodeValue).toBeNull();
  await userEvent.click(screen.getByRole("button", { name: "確定" }));

  expect(screen.getAllByRole("alert", { name: REQUIRED })).toHaveLength(2);
});

test("should show validate error of max length charge name", async () => {
  const onSuccess = vitest.fn();
  rtlRender(<UpdateCharge charge_id="2" onSuccess={onSuccess} />, {
    wrapper: AppProvider,
  });

  await userEvent.click(screen.getByRole("button", { name: "編集" }));
  await userEvent.type(
    screen.getByLabelText("担当者"),
    "123456789012345678901234567890123456789012345678901",
  );
  await userEvent.click(screen.getByRole("button", { name: "確定" }));

  expect(
    screen.getAllByRole("alert", { name: MAX_STR_INVALID.replace("%d", "50") }),
  ).toHaveLength(1);
});

test("should show validate error of email format", async () => {
  const onSuccess = vitest.fn();
  rtlRender(<UpdateCharge charge_id="1" onSuccess={onSuccess} />, {
    wrapper: AppProvider,
  });

  await userEvent.click(screen.getByRole("button", { name: "編集" }));
  await userEvent.clear(screen.getByLabelText("Eメール"));
  expect(screen.getByLabelText("Eメール").nodeValue).toBeNull();
  await userEvent.type(screen.getByLabelText("Eメール"), "test");
  await userEvent.click(screen.getByRole("button", { name: "確定" }));

  expect(screen.getAllByRole("alert", { name: EMAIL_INVALID })).toHaveLength(1);
});

test("should show validate error of max length charge email", async () => {
  const onSuccess = vitest.fn();
  rtlRender(<UpdateCharge charge_id="2" onSuccess={onSuccess} />, {
    wrapper: AppProvider,
  });

  await userEvent.click(screen.getByRole("button", { name: "編集" }));
  await userEvent.type(
    screen.getByLabelText("Eメール"),
    "1234567890123456789012345678901234567890123456789012345678901234567890123456789012345678901234567890123456789012345678901234567890123456789012345678901234567890123456789012345678901234567890123456789012345678901234567890123456789012345678901234567890@test-test.com",
  );
  await userEvent.click(screen.getByRole("button", { name: "確定" }));

  expect(
    screen.getAllByRole("alert", {
      name: MAX_STR_INVALID.replace("%d", "254"),
    }),
  ).toHaveLength(1);
});
