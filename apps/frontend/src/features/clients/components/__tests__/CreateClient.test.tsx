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
import { CreateClient } from "../CreateClient";
import { AppProvider } from "@/providers/app";
import {
  HIRAGANA_INVALID,
  INVOICE_LEN,
  MAX_STR_INVALID,
  NUM_INVALID,
  POST_CODE_LEN,
  REQUIRED,
} from "@/utils/validate";

const company_name = "株式会社";
const company_kana = "かぶしきかいしゃ";
const post_code = "8100001";
const company_address = "あどれす";
const invoice_code = "1234567890123";
const bank_name = "西銀";
const bank_code = "1234567";

test("should success to create client data", async () => {
  const onSuccess = vitest.fn();
  rtlRender(<CreateClient onSuccess={onSuccess} />, {
    wrapper: AppProvider,
  });
  await waitForLoadingToFinish();

  await userEvent.click(screen.getByRole("button", { name: "取引先登録" }));

  await userEvent.type(screen.getByLabelText("企業名"), company_name);
  await userEvent.type(screen.getByLabelText("企業名かな"), company_kana);
  await userEvent.type(screen.getByLabelText("郵便番号"), post_code);
  await userEvent.type(screen.getByLabelText("所在地"), company_address);
  await userEvent.type(screen.getByLabelText("インボイス番号T-"), invoice_code);
  await userEvent.type(screen.getByLabelText("銀行名"), bank_name);
  await userEvent.type(screen.getByLabelText("口座番号"), bank_code);
  await userEvent.selectOptions(screen.getByRole("combobox"), ["末日締め"]);

  await userEvent.click(screen.getByRole("button", { name: "登録" }));

  await waitFor(() => expect(onSuccess).toHaveBeenCalledTimes(1));
});

test("should show validate error of required", async () => {
  const onSuccess = vitest.fn();
  rtlRender(<CreateClient onSuccess={onSuccess} />, {
    wrapper: AppProvider,
  });

  await userEvent.click(screen.getByRole("button", { name: "取引先登録" }));
  await userEvent.click(screen.getByRole("button", { name: "登録" }));

  expect(screen.getAllByRole("alert", { name: REQUIRED })).toHaveLength(8);
});

test("should show validate error of company name max length", async () => {
  const onSuccess = vitest.fn();
  rtlRender(<CreateClient onSuccess={onSuccess} />, {
    wrapper: AppProvider,
  });

  await userEvent.click(screen.getByRole("button", { name: "取引先登録" }));
  await userEvent.type(
    screen.getByLabelText("企業名"),
    "TestedTestedTestedTestedTestedTestedTestedTestedTestedTested",
  );

  await userEvent.click(screen.getByRole("button", { name: "登録" }));
  expect(
    screen.getAllByRole("alert", { name: MAX_STR_INVALID.replace("%d", "50") }),
  ).toHaveLength(1);
});

test("should show validate error of company kana katakana", async () => {
  const onSuccess = vitest.fn();
  rtlRender(<CreateClient onSuccess={onSuccess} />, {
    wrapper: AppProvider,
  });

  await userEvent.click(screen.getByRole("button", { name: "取引先登録" }));

  await userEvent.type(screen.getByLabelText("企業名かな"), "テスト");
  await userEvent.click(screen.getByRole("button", { name: "登録" }));

  expect(screen.getAllByRole("alert", { name: HIRAGANA_INVALID })).toHaveLength(
    1,
  );
});

test("should show validate error of company kana alphabet", async () => {
  const onSuccess = vitest.fn();
  rtlRender(<CreateClient onSuccess={onSuccess} />, {
    wrapper: AppProvider,
  });

  await userEvent.click(screen.getByRole("button", { name: "取引先登録" }));

  await userEvent.type(screen.getByLabelText("企業名かな"), "test inc.");
  await userEvent.click(screen.getByRole("button", { name: "登録" }));

  expect(screen.getAllByRole("alert", { name: HIRAGANA_INVALID })).toHaveLength(
    1,
  );
});

test("should show validate error of company kana max length", async () => {
  const onSuccess = vitest.fn();
  rtlRender(<CreateClient onSuccess={onSuccess} />, {
    wrapper: AppProvider,
  });

  await userEvent.click(screen.getByRole("button", { name: "取引先登録" }));
  await userEvent.type(
    screen.getByLabelText("企業名かな"),
    "てすとだよてすとだよてすとだよてすとだよてすとだよてすとだよてすとだよてすとだよてすとだよてすとだよてすとだよ",
  );

  await userEvent.click(screen.getByRole("button", { name: "登録" }));
  expect(
    screen.getAllByRole("alert", { name: MAX_STR_INVALID.replace("%d", "50") }),
  ).toHaveLength(1);
});

test("should show validate error of post code only number", async () => {
  const onSuccess = vitest.fn();
  rtlRender(<CreateClient onSuccess={onSuccess} />, {
    wrapper: AppProvider,
  });

  await userEvent.click(screen.getByRole("button", { name: "取引先登録" }));

  await userEvent.type(screen.getByLabelText("郵便番号"), "string");
  await userEvent.click(screen.getByRole("button", { name: "登録" }));
  expect(screen.getAllByRole("alert", { name: NUM_INVALID })).toHaveLength(1);
});

test("should show validate error of post code min length", async () => {
  const onSuccess = vitest.fn();
  rtlRender(<CreateClient onSuccess={onSuccess} />, {
    wrapper: AppProvider,
  });

  await userEvent.click(screen.getByRole("button", { name: "取引先登録" }));

  await userEvent.type(screen.getByLabelText("郵便番号"), "123");
  await userEvent.click(screen.getByRole("button", { name: "登録" }));

  expect(screen.getAllByRole("alert", { name: POST_CODE_LEN })).toHaveLength(1);
});

test("should show validate error of post code max length", async () => {
  const onSuccess = vitest.fn();
  rtlRender(<CreateClient onSuccess={onSuccess} />, {
    wrapper: AppProvider,
  });

  await userEvent.click(screen.getByRole("button", { name: "取引先登録" }));

  await userEvent.type(screen.getByLabelText("郵便番号"), "12345678");
  await userEvent.click(screen.getByRole("button", { name: "登録" }));
  expect(screen.getAllByRole("alert", { name: POST_CODE_LEN })).toHaveLength(1);
});

test("should show validate error of invoice min length", async () => {
  const onSuccess = vitest.fn();
  rtlRender(<CreateClient onSuccess={onSuccess} />, {
    wrapper: AppProvider,
  });

  await userEvent.click(screen.getByRole("button", { name: "取引先登録" }));
  await userEvent.type(screen.getByLabelText("インボイス番号T-"), "1");
  await userEvent.click(screen.getByRole("button", { name: "登録" }));

  expect(screen.getAllByRole("alert", { name: INVOICE_LEN })).toHaveLength(1);
});

test("should show validate error of invoice max length", async () => {
  const onSuccess = vitest.fn();
  rtlRender(<CreateClient onSuccess={onSuccess} />, {
    wrapper: AppProvider,
  });

  await userEvent.click(screen.getByRole("button", { name: "取引先登録" }));

  await userEvent.type(
    screen.getByLabelText("インボイス番号T-"),
    "12345678901234",
  );
  await userEvent.click(screen.getByRole("button", { name: "登録" }));
  expect(screen.getAllByRole("alert", { name: INVOICE_LEN })).toHaveLength(1);
});
