import {
  screen,
  test,
  expect,
  userEvent,
  rtlRender,
  waitForLoadingToFinish,
  createClient,
  MemoryRouter,
} from "@/test/test-utils";
import { AppProvider } from "@/providers/app";
import { ClientsList } from "..";

const client = createClient({
  created_date: "2024-10-10",
});

test("should render client list", async () => {
  rtlRender(
    <MemoryRouter>
      <ClientsList />
    </MemoryRouter>,
    {
      wrapper: AppProvider,
    },
  );
  await waitForLoadingToFinish();

  expect(screen.getAllByText("取引先名")).toHaveLength(1);
  expect(screen.getAllByText("所在地")).toHaveLength(1);
  expect(screen.getAllByText("登録日")).toHaveLength(1);

  expect(screen.getAllByText(client.company_name)).toHaveLength(1);
  expect(screen.getAllByText(client.company_address)).toHaveLength(1);
  expect(screen.getAllByText(client.created_date)).toHaveLength(1);
  expect(screen.getAllByRole("button", { name: "詳細" })).not.toHaveLength(0);
  expect(screen.getAllByRole("button", { name: "削除" })).not.toHaveLength(0);
});

test("should render page 2", async () => {
  for (let i = 1; i <= 20; i++) {
    createClient({
      client_id: 99 + i,
      company_name: "企業" + i,
      company_address: "住所" + i,
      created_date: "2024-10-10",
    });
  }
  rtlRender(
    <MemoryRouter>
      <ClientsList />
    </MemoryRouter>,
    {
      wrapper: AppProvider,
    },
  );

  await userEvent.click(screen.getAllByTestId("page-next")[0]);

  expect(screen.getAllByText("企業20")).toHaveLength(1);
  expect(screen.getAllByText("住所20")).toHaveLength(1);
});
