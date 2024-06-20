import {
  screen,
  userEvent,
  test,
  expect,
  rtlRender,
  waitForLoadingToFinish,
  MemoryRouter,
  createProject,
} from "@/test/test-utils";
import { AppProvider } from "@/providers/app";

import { DeleteProject } from "..";

const project = createProject();
test("should success to delete project", async () => {
  rtlRender(
    <MemoryRouter>
      <DeleteProject project_id={project.project_id} />
    </MemoryRouter>,
    {
      wrapper: AppProvider,
    },
  );
  await waitForLoadingToFinish();

  await userEvent.click(screen.getByRole("button", { name: "削除" }));

  expect(screen.getAllByText("案件削除")).toHaveLength(1);

  await userEvent.click(screen.getByRole("button", { name: "削除" }));

  expect(screen.getAllByText("案件を削除しました")).toHaveLength(1);
});
