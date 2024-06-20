import {
  screen,
  userEvent,
  test,
  expect,
  rtlRender,
  waitForLoadingToFinish,
} from "@/test/test-utils";
import { AppProvider } from "@/providers/app";
import { CreateProjectDetail } from "..";
import { projectDetailGenerator } from "@/test/data-generators";
import { INT_INVALID, REQUIRED } from "@/utils/validate";
import { showPrice } from "@/utils/format";

test("should success to create project detail", async () => {
  const detail = projectDetailGenerator();
  rtlRender(<CreateProjectDetail project_id="1" />, {
    wrapper: AppProvider,
  });
  await waitForLoadingToFinish();

  await userEvent.click(screen.getByRole("button", { name: "明細新規追加" }));

  expect(screen.getAllByText("明細作成")).toHaveLength(1);

  await userEvent.type(screen.getByLabelText("製品名"), detail.product_name);
  await userEvent.type(screen.getByLabelText("型式"), detail.model_name);
  await userEvent.type(screen.getByLabelText("数量"), String(detail.amount));
  await userEvent.selectOptions(screen.getByRole("combobox"), ["式"]);
  await userEvent.type(
    screen.getByLabelText("単価"),
    String(detail.unit_price),
  );
  await userEvent.type(screen.getByLabelText("備考"), String(detail.remarks));

  expect(
    screen.getAllByText(showPrice(detail.amount * detail.unit_price)),
  ).toHaveLength(1);

  await userEvent.click(screen.getByRole("button", { name: "追加" }));

  expect(screen.getAllByText("明細を登録しました")).toHaveLength(1);
});

test("should show validation error of required", async () => {
  rtlRender(<CreateProjectDetail project_id="1" />, {
    wrapper: AppProvider,
  });

  await userEvent.click(screen.getByRole("button", { name: "明細新規追加" }));

  await userEvent.click(screen.getByRole("button", { name: "追加" }));

  expect(screen.getAllByText(REQUIRED)).toHaveLength(1);
});

test("should show validation error of number when input test", async () => {
  rtlRender(<CreateProjectDetail project_id="1" />, {
    wrapper: AppProvider,
  });

  await userEvent.click(screen.getByRole("button", { name: "明細新規追加" }));

  await userEvent.type(screen.getByLabelText("数量"), "test");
  await userEvent.type(screen.getByLabelText("単価"), "test");

  await userEvent.click(screen.getByRole("button", { name: "追加" }));

  expect(screen.getAllByText(INT_INVALID)).toHaveLength(2);
});

test("should show validation error of number when input float", async () => {
  rtlRender(<CreateProjectDetail project_id="1" />, {
    wrapper: AppProvider,
  });

  await userEvent.click(screen.getByRole("button", { name: "明細新規追加" }));

  await userEvent.type(screen.getByLabelText("数量"), "20.20");
  await userEvent.type(screen.getByLabelText("単価"), "20.20");

  await userEvent.click(screen.getByRole("button", { name: "追加" }));

  expect(screen.getAllByText(INT_INVALID)).toHaveLength(2);
});
