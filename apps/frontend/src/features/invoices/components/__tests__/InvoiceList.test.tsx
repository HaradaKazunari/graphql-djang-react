import {
  screen,
  userEvent,
  test,
  expect,
  rtlRender,
  waitForLoadingToFinish,
  createInvoice,
  MemoryRouter,
} from "@/test/test-utils";
import { AppProvider } from "@/providers/app";

import { InvoicesList } from "..";

import { formatDate } from "@/utils/format";
import { SHOW_YM_FORMATE } from "@/config";

const invoice = createInvoice({
  close_classification: "2",
});

test("should render invoice list", async () => {
  rtlRender(
    <MemoryRouter>
      <InvoicesList />
    </MemoryRouter>,
    {
      wrapper: AppProvider,
    },
  );
  await waitForLoadingToFinish();

  expect(screen.getAllByText("請求年月")).toHaveLength(1);
  expect(screen.getAllByText("取引先名")).toHaveLength(1);
  expect(screen.getAllByText("締め区分")).toHaveLength(1);
  expect(screen.getAllByText("案件数")).toHaveLength(1);

  expect(
    screen.getAllByText(formatDate(invoice.invoice_ym, SHOW_YM_FORMATE)),
  ).toHaveLength(1);
  expect(screen.getAllByText(invoice.client_name)).toHaveLength(1);
  expect(screen.getAllByText(invoice.project_count + "件")).toHaveLength(1);

  expect(screen.getAllByText("詳細")).toHaveLength(1);
});

test("should render page 2", async () => {
  for (let i = 1; i <= 20; i++) {
    createInvoice({
      client_id: 99 + i,
      client_name: "企業" + i,
      close_classification: "2",
      project_count: 100 + i,
    });
  }
  rtlRender(
    <MemoryRouter>
      <InvoicesList />
    </MemoryRouter>,
    {
      wrapper: AppProvider,
    },
  );

  await userEvent.click(screen.getAllByTestId("page-next")[0]);

  expect(screen.getAllByText("企業20")).toHaveLength(1);
  expect(screen.getAllByText("120件")).toHaveLength(1);
});
