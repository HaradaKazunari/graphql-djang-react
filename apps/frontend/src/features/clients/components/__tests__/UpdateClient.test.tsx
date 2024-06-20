import {
  screen,
  test,
  userEvent,
  vitest,
  waitFor,
  expect,
  rtlRender,
  waitForLoadingToFinish,
  createClient,
} from "@/test/test-utils";
import { UpdateClient } from "../UpdateClient";
import { AppProvider } from "@/providers/app";
import {
  HIRAGANA_INVALID,
  INVOICE_LEN,
  MAX_STR_INVALID,
  NUM_INVALID,
  POST_CODE_LEN,
  REQUIRED,
} from "@/utils/validate";
import { clientGenerator } from "@/test/data-generators";

const client = createClient();
test("should set default value", async () => {
  rtlRender(<UpdateClient client_id={client.client_id} />, {
    wrapper: AppProvider,
  });
  await waitForLoadingToFinish();

  await userEvent.click(screen.getByRole("button", { name: "編集" }));

  expect(screen.getByLabelText("企業名").value).toEqual(client.company_name);
  expect(screen.getByLabelText("企業名かな").value).toEqual(
    client.company_kana,
  );
  expect(screen.getByLabelText("郵便番号").value).toEqual(client.post_code);
  expect(screen.getByLabelText("所在地").value).toEqual(client.company_address);
  expect(screen.getByLabelText("インボイス番号T-").value).toEqual(
    client.invoice_code,
  );
  expect(screen.getByLabelText("銀行名").value).toEqual(client.bank_name);
  expect(screen.getByLabelText("口座番号").value).toEqual(client.bank_code);
});

test("should success to update client data", async () => {
  const client = clientGenerator();
  const onSuccess = vitest.fn();
  rtlRender(<UpdateClient client_id="1" onSuccess={onSuccess} />, {
    wrapper: AppProvider,
  });

  await userEvent.click(screen.getByRole("button", { name: "編集" }));

  await userEvent.type(screen.getByLabelText("企業名"), client.company_name);
  await userEvent.type(
    screen.getByLabelText("企業名かな"),
    client.company_kana,
  );
  await userEvent.type(screen.getByLabelText("郵便番号"), client.post_code);
  await userEvent.type(screen.getByLabelText("所在地"), client.company_address);
  await userEvent.type(
    screen.getByLabelText("インボイス番号T-"),
    client.invoice_code,
  );
  await userEvent.type(screen.getByLabelText("銀行名"), client.bank_name);
  await userEvent.type(screen.getByLabelText("口座番号"), client.bank_code);
  await userEvent.selectOptions(screen.getByRole("combobox"), ["末日締め"]);

  await userEvent.click(screen.getByRole("button", { name: "確定" }));

  await waitFor(() => expect(onSuccess).toHaveBeenCalledTimes(1));
});

test("should show validate error of required", async () => {
  const onSuccess = vitest.fn();
  rtlRender(
    <UpdateClient client_id={client.client_id} onSuccess={onSuccess} />,
    {
      wrapper: AppProvider,
    },
  );

  await userEvent.click(screen.getByRole("button", { name: "編集" }));

  await userEvent.clear(screen.getByLabelText("企業名"));
  await userEvent.clear(screen.getByLabelText("企業名かな"));
  await userEvent.clear(screen.getByLabelText("郵便番号"));
  await userEvent.clear(screen.getByLabelText("所在地"));
  await userEvent.clear(screen.getByLabelText("インボイス番号T-"));
  await userEvent.clear(screen.getByLabelText("銀行名"));
  await userEvent.clear(screen.getByLabelText("口座番号"));
  await userEvent.selectOptions(screen.getByRole("combobox"), [""]);

  await userEvent.click(screen.getByRole("button", { name: "確定" }));

  expect(screen.getAllByRole("alert", { name: REQUIRED })).toHaveLength(8);
});

test("should show validate error of company name max length", async () => {
  const onSuccess = vitest.fn();
  rtlRender(
    <UpdateClient client_id={client.client_id} onSuccess={onSuccess} />,
    {
      wrapper: AppProvider,
    },
  );

  await userEvent.click(screen.getByRole("button", { name: "編集" }));
  await userEvent.type(
    screen.getByLabelText("企業名"),
    "TestedTestedTestedTestedTestedTestedTestedTestedTestedTested",
  );

  await userEvent.click(screen.getByRole("button", { name: "確定" }));
  expect(
    screen.getAllByRole("alert", { name: MAX_STR_INVALID.replace("%d", "50") }),
  ).toHaveLength(1);
});

test("should show validate error of company kana katakana", async () => {
  const onSuccess = vitest.fn();
  rtlRender(
    <UpdateClient client_id={client.client_id} onSuccess={onSuccess} />,
    {
      wrapper: AppProvider,
    },
  );

  await userEvent.click(screen.getByRole("button", { name: "編集" }));

  await userEvent.type(screen.getByLabelText("企業名かな"), "テスト");
  await userEvent.click(screen.getByRole("button", { name: "確定" }));

  expect(screen.getAllByRole("alert", { name: HIRAGANA_INVALID })).toHaveLength(
    1,
  );
});

test("should show validate error of company kana alphabet", async () => {
  const onSuccess = vitest.fn();
  rtlRender(
    <UpdateClient client_id={client.client_id} onSuccess={onSuccess} />,
    {
      wrapper: AppProvider,
    },
  );

  await userEvent.click(screen.getByRole("button", { name: "編集" }));

  await userEvent.type(screen.getByLabelText("企業名かな"), "test inc.");
  await userEvent.click(screen.getByRole("button", { name: "確定" }));

  expect(screen.getAllByRole("alert", { name: HIRAGANA_INVALID })).toHaveLength(
    1,
  );
});

test("should show validate error of company kana max length", async () => {
  const onSuccess = vitest.fn();
  rtlRender(
    <UpdateClient client_id={client.client_id} onSuccess={onSuccess} />,
    {
      wrapper: AppProvider,
    },
  );

  await userEvent.click(screen.getByRole("button", { name: "編集" }));
  await userEvent.type(
    screen.getByLabelText("企業名かな"),
    "てすとだよてすとだよてすとだよてすとだよてすとだよてすとだよてすとだよてすとだよてすとだよてすとだよてすとだよ",
  );

  await userEvent.click(screen.getByRole("button", { name: "確定" }));
  expect(
    screen.getAllByRole("alert", { name: MAX_STR_INVALID.replace("%d", "50") }),
  ).toHaveLength(1);
});

test("should show validate error of post code only number", async () => {
  const onSuccess = vitest.fn();
  rtlRender(
    <UpdateClient client_id={client.client_id} onSuccess={onSuccess} />,
    {
      wrapper: AppProvider,
    },
  );

  await userEvent.click(screen.getByRole("button", { name: "編集" }));

  await userEvent.type(screen.getByLabelText("郵便番号"), "string");
  await userEvent.click(screen.getByRole("button", { name: "確定" }));
  expect(screen.getAllByRole("alert", { name: NUM_INVALID })).toHaveLength(1);
});

test("should show validate error of post code min length", async () => {
  const onSuccess = vitest.fn();
  rtlRender(
    <UpdateClient client_id={client.client_id} onSuccess={onSuccess} />,
    {
      wrapper: AppProvider,
    },
  );

  await userEvent.click(screen.getByRole("button", { name: "編集" }));

  await userEvent.type(screen.getByLabelText("郵便番号"), "123");
  await userEvent.click(screen.getByRole("button", { name: "確定" }));

  expect(screen.getAllByRole("alert", { name: POST_CODE_LEN })).toHaveLength(1);
});

test("should show validate error of post code max length", async () => {
  const onSuccess = vitest.fn();
  rtlRender(
    <UpdateClient client_id={client.client_id} onSuccess={onSuccess} />,
    {
      wrapper: AppProvider,
    },
  );

  await userEvent.click(screen.getByRole("button", { name: "編集" }));

  await userEvent.type(screen.getByLabelText("郵便番号"), "12345678");
  await userEvent.click(screen.getByRole("button", { name: "確定" }));
  expect(screen.getAllByRole("alert", { name: POST_CODE_LEN })).toHaveLength(1);
});

test("should show validate error of invoice min length", async () => {
  const onSuccess = vitest.fn();
  rtlRender(
    <UpdateClient client_id={client.client_id} onSuccess={onSuccess} />,
    {
      wrapper: AppProvider,
    },
  );

  await userEvent.click(screen.getByRole("button", { name: "編集" }));
  await userEvent.type(screen.getByLabelText("インボイス番号T-"), "1");
  await userEvent.click(screen.getByRole("button", { name: "確定" }));

  expect(screen.getAllByRole("alert", { name: INVOICE_LEN })).toHaveLength(1);
});

test("should show validate error of invoice max length", async () => {
  const onSuccess = vitest.fn();
  rtlRender(
    <UpdateClient client_id={client.client_id} onSuccess={onSuccess} />,
    {
      wrapper: AppProvider,
    },
  );

  await userEvent.click(screen.getByRole("button", { name: "編集" }));

  await userEvent.type(
    screen.getByLabelText("インボイス番号T-"),
    "12345678901234",
  );
  await userEvent.click(screen.getByRole("button", { name: "確定" }));
  expect(screen.getAllByRole("alert", { name: INVOICE_LEN })).toHaveLength(1);
});
