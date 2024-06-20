import {
  render,
  screen,
  userEvent,
  waitFor,
  test,
  expect,
  vitest,
  rtlRender,
  MemoryRouter,
} from "@/test/test-utils";

import { AppProvider } from "@/providers/app";
import { LoginForm } from "../LoginForm";

test("should login new user and call onSuccess cb which should navigate the user to the app", async () => {
  const onSuccess = vitest.fn();
  const newUser = {
    username: "admin",
    password: "admin",
  };
  await render(
    <MemoryRouter>
      <LoginForm onSuccess={onSuccess} />
    </MemoryRouter>,
    {
      user: null,
    }
  );

  await userEvent.type(screen.getByLabelText("ユーザ名"), newUser.username);
  await userEvent.type(screen.getByLabelText("パスワード"), newUser.password);

  await userEvent.click(screen.getByRole("button", { name: "ログイン" }));

  await waitFor(() => expect(onSuccess).toHaveBeenCalledTimes(1));
});

test("should show validation error of required", async () => {
  const onSuccess = vitest.fn();
  rtlRender(
    <MemoryRouter>
      <LoginForm onSuccess={onSuccess} />
    </MemoryRouter>,
    {
      wrapper: AppProvider,
    }
  );

  await userEvent.click(screen.getByRole("button", { name: "ログイン" }));
  await waitFor(() => {
    expect(screen.getAllByRole("alert", { name: "必須です" })).toHaveLength(2);
  });
});
