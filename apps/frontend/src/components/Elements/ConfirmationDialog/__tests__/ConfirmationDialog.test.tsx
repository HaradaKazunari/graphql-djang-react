import {
  rtlRender,
  screen,
  userEvent,
  waitFor,
  test,
  expect,
} from "@/test/test-utils";

import { Button } from "../../Button";
import { ConfirmationDialog } from "../ConfirmationDialog";

test("should handle confirmation flow", async () => {
  const titleText = "Are you sure?";
  const bodyText = "Are you sure you want to delete this item?";
  const confirmationButtonText = "Confirm";
  const openButtonText = "Open";

  rtlRender(
    <ConfirmationDialog
      icon="danger"
      title={titleText}
      body={bodyText}
      confirmButton={<Button>{confirmationButtonText}</Button>}
      triggerButton={<Button>{openButtonText}</Button>}
    />,
  );

  expect(screen.queryByText(titleText)).toBeNull();

  await userEvent.click(screen.getByRole("button", { name: openButtonText }));

  expect(screen.getByText(titleText)).toBeDefined();

  expect(screen.getByText(bodyText)).toBeDefined();

  await userEvent.click(screen.getByRole("button", { name: "Cancel" }));

  await waitFor(() => expect(screen.queryByText(titleText)).toBeNull());

  expect(screen.queryByText(bodyText)).toBeNull();
});
