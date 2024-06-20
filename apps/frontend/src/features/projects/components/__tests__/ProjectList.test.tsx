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

import { ProjectsList } from "..";

import { formatDate } from "@/utils/format";
import { SHOW_DATE_FORMATE } from "@/config";

const project = createProject();

test("should render project list", async () => {
  rtlRender(
    <MemoryRouter>
      <ProjectsList />
    </MemoryRouter>,
    {
      wrapper: AppProvider,
    },
  );
  await waitForLoadingToFinish();

  expect(screen.getAllByText("案件名")).toHaveLength(1);
  expect(screen.getAllByText("取引先名")).toHaveLength(1);
  expect(screen.getAllByText("担当者名")).toHaveLength(1);
  expect(screen.getAllByText("納品予定日")).toHaveLength(1);
  expect(screen.getAllByText("納品済み")).toHaveLength(1);
  expect(screen.getAllByText("請求済み")).toHaveLength(1);

  expect(screen.getAllByText(project.project_name)).toHaveLength(1);
  expect(screen.getAllByText(project.client_name)).toHaveLength(1);
  expect(
    screen.getAllByText(
      formatDate(project.delivery_schedule_date, SHOW_DATE_FORMATE),
    ),
  ).toHaveLength(1);

  expect(screen.getAllByText("詳細")).toHaveLength(1);
});

test("should render page 2", async () => {
  for (let i = 1; i <= 20; i++) {
    createProject({
      client_id: 99 + i,
      client_name: "企業" + i,
      close_classification: "2",
      project_count: 100 + i,
    });
  }
  rtlRender(
    <MemoryRouter>
      <ProjectsList />
    </MemoryRouter>,
    {
      wrapper: AppProvider,
    },
  );

  await userEvent.click(screen.getAllByTestId("page-next")[0]);

  expect(screen.getAllByText("企業20")).toHaveLength(1);
});
