import {
  screen,
  test,
  expect,
  rtlRender,
  waitForLoadingToFinish,
  createProjectDetail,
} from "@/test/test-utils";
import { AppProvider } from "@/providers/app";
import { ProjectDetailsList } from "..";
import { showPrice } from "@/utils/format";

const project_id = "1";

test("should render client list", async () => {
  const detail = createProjectDetail({
    amount: "20",
    unit_price: "30",
    project_id,
  });
  const detail_not_equal_id = createProjectDetail({
    project_id: "2",
  });

  rtlRender(<ProjectDetailsList project_id={project_id} />, {
    wrapper: AppProvider,
  });
  await waitForLoadingToFinish();

  expect(screen.getAllByText("製品名")).toHaveLength(1);
  expect(screen.getAllByText("型式")).toHaveLength(1);
  expect(screen.getAllByText("数量")).toHaveLength(1);
  expect(screen.getAllByText("単位")).toHaveLength(1);
  expect(screen.getAllByText("単価")).toHaveLength(1);
  expect(screen.getAllByText("金額")).toHaveLength(1);
  expect(screen.getAllByText("備考")).toHaveLength(1);

  expect(screen.getAllByText(detail.product_name)).toHaveLength(1);
  expect(screen.getAllByText(detail.model_name)).toHaveLength(1);
  expect(screen.getAllByText(detail.amount)).toHaveLength(1);
  expect(screen.getAllByText(showPrice(detail.unit_price))).toHaveLength(1);
  expect(
    screen.getAllByText(showPrice(detail.unit_price * detail.amount)),
  ).toHaveLength(1);
  expect(screen.getAllByText(detail.remarks)).toHaveLength(1);

  expect(screen.queryByText(detail_not_equal_id.product_name)).toBeNull();
});

test("should render edit and delete button", async () => {
  createProjectDetail({
    project_id,
  });

  rtlRender(<ProjectDetailsList project_id={project_id} canEdit />, {
    wrapper: AppProvider,
  });

  expect(screen.queryByTestId("detail-edit-button")).not.toBeNull();
  expect(screen.queryByTestId("detail-delete-button")).not.toBeNull();
});

test("should not render edit and delete button", async () => {
  createProjectDetail({
    project_id,
  });

  rtlRender(<ProjectDetailsList project_id={project_id} />, {
    wrapper: AppProvider,
  });

  expect(screen.queryByTestId("detail-edit-button")).toBeNull();
  expect(screen.queryByTestId("detail-delete-button")).toBeNull();
});
