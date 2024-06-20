import {
  screen,
  userEvent,
  test,
  expect,
  rtlRender,
  waitForLoadingToFinish,
  createProjectDetail,
} from "@/test/test-utils";
import { AppProvider } from "@/providers/app";
import { UpdateProjectDetail } from "..";
import { INT_INVALID, REQUIRED } from "@/utils/validate";
import { showPrice } from "@/utils/format";

const detail = createProjectDetail();
test("should set default value", async () => {
  rtlRender(<UpdateProjectDetail project_detail_id={detail.id} />, {
    wrapper: AppProvider,
  });
  await waitForLoadingToFinish();

  await userEvent.click(screen.getByTestId("detail-edit-button"));

  expect(screen.getAllByText("明細 編集")).toHaveLength(1);

  expect(screen.getByLabelText("製品名").value).toEqual(detail.product_name);
  expect(screen.getByLabelText("型式").value).toEqual(detail.model_name);
  expect(screen.getByLabelText("数量").value).toEqual(String(detail.amount));
  expect(screen.getByLabelText("単価").value).toEqual(
    String(detail.unit_price),
  );
  expect(
    screen.getAllByText(showPrice(detail.amount * detail.unit_price)),
  ).toHaveLength(1);
  expect(screen.getByLabelText("備考").value).toEqual(detail.remarks);
});

test("should show validation error of required", async () => {
  rtlRender(<UpdateProjectDetail project_detail_id={detail.id} />, {
    wrapper: AppProvider,
  });

  await userEvent.click(screen.getByTestId("detail-edit-button"));

  await userEvent.clear(screen.getByLabelText("製品名"));

  await userEvent.click(screen.getByRole("button", { name: "確定" }));

  expect(screen.getAllByText(REQUIRED)).toHaveLength(1);
});

test("should show validation error of number when input string", async () => {
  rtlRender(<UpdateProjectDetail project_detail_id={detail.id} />, {
    wrapper: AppProvider,
  });

  await userEvent.click(screen.getByTestId("detail-edit-button"));

  await userEvent.type(screen.getByLabelText("数量"), "test");
  await userEvent.type(screen.getByLabelText("単価"), "test");

  await userEvent.click(screen.getByRole("button", { name: "確定" }));

  expect(screen.getAllByText(INT_INVALID)).toHaveLength(2);
});

test("should show validation error of number when input float", async () => {
  rtlRender(<UpdateProjectDetail project_detail_id={detail.id} />, {
    wrapper: AppProvider,
  });

  await userEvent.click(screen.getByTestId("detail-edit-button"));

  await userEvent.type(screen.getByLabelText("数量"), "20.20");
  await userEvent.type(screen.getByLabelText("単価"), "20.20");

  await userEvent.click(screen.getByRole("button", { name: "確定" }));

  expect(screen.getAllByText(INT_INVALID)).toHaveLength(2);
});
