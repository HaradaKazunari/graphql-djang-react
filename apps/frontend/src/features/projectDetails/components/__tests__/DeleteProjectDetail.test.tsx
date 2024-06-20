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
import { DeleteProjectDetail } from "../DeleteProjectDetail";

const project_id = "1";
const detail = createProjectDetail({ project_id });
test("should render delete project detail", async () => {
  rtlRender(
    <DeleteProjectDetail
      project_id={project_id}
      project_detail_id={detail.id}
    />,
    {
      wrapper: AppProvider,
    },
  );

  await waitForLoadingToFinish();

  await userEvent.click(screen.getByTestId("detail-delete-button"));

  expect(screen.getByText("明細削除")).not.toBeNull();
  expect(screen.getByText("本当に削除しますか？")).not.toBeNull();

  await userEvent.click(screen.getByRole("button", { name: "削除" }));

  expect(screen.getByText("明細を削除しました")).not.toBeNull();
});
