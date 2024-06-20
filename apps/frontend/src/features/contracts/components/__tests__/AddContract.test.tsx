import {
  screen,
  userEvent,
  test,
  expect,
  rtlRender,
  waitForLoadingToFinish,
  createProject,
} from "@/test/test-utils";

import { AddContract } from "..";
import { AppProvider } from "@/providers/app";
import { DATE_INVALID } from "@/utils/validate";

const delivery_schedule_date = "2024-01-01";
const invoice_schedule_date = "2024-02-02";
const order_no = "メール:2024年";

const project = createProject();

test("should success to create contract data", async () => {
  rtlRender(<AddContract project_id={project.project_id} />, {
    wrapper: AppProvider,
  });

  await waitForLoadingToFinish();

  await userEvent.click(screen.getByRole("button", { name: "登録" }));

  await userEvent.clear(screen.getByLabelText("納品予定日"));
  await userEvent.clear(screen.getByLabelText("請求予定日"));

  await userEvent.type(
    screen.getByLabelText("納品予定日"),
    delivery_schedule_date,
  );
  await userEvent.type(
    screen.getByLabelText("請求予定日"),
    invoice_schedule_date,
  );
  await userEvent.type(screen.getByLabelText("注番"), order_no);

  await userEvent.click(screen.getByRole("button", { name: "確定" }));

  expect(screen.getAllByText("受注情報を登録しました")).toHaveLength(1);
});

test("should show validation error of date", async () => {
  rtlRender(<AddContract project_id={project.project_id} />, {
    wrapper: AppProvider,
  });
  await userEvent.click(screen.getByRole("button", { name: "登録" }));

  await userEvent.clear(screen.getByLabelText("納品予定日"));
  await userEvent.clear(screen.getByLabelText("請求予定日"));

  await userEvent.click(screen.getByRole("button", { name: "確定" }));

  expect(screen.getAllByRole("alert", { name: DATE_INVALID })).toHaveLength(2);
});
