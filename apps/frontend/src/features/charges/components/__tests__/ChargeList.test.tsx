import {
  screen,
  test,
  expect,
  userEvent,
  rtlRender,
  waitForLoadingToFinish,
  createCharge,
} from "@/test/test-utils";
import { AppProvider } from "@/providers/app";
import { ChargesList } from "..";

const charge_id = "33";
const charge_name = "たんとうしゃ";
const email = "tet@test.com";

const charge = createCharge({
  charge_id,
  charge_name,
  email,
});

test("should render charge list", async () => {
  rtlRender(<ChargesList client_id={charge.client_id} />, {
    wrapper: AppProvider,
  });
  await waitForLoadingToFinish();

  expect(screen.getByText("担当者").textContent).toBe("担当者");
  expect(screen.getByText("Eメール").textContent).toBe("Eメール");

  expect(screen.getByText(charge.charge_name).textContent).toBe(
    charge.charge_name,
  );
  expect(screen.getByText(charge.email).textContent).toBe(charge.email);
  expect(screen.getAllByRole("button", { name: "編集" })).not.toHaveLength(0);
  expect(screen.getAllByRole("button", { name: "削除" })).not.toHaveLength(0);
});

test("should render page 2", async () => {
  for (let i = 1; i <= 20; i++) {
    createCharge({
      charge_id: i,
      charge_name: charge_name + i,
      email: email + i,
      created_date: "2024-04-" + i,
    });
  }
  rtlRender(<ChargesList client_id={charge.client_id} />, {
    wrapper: AppProvider,
  });

  await userEvent.click(screen.getAllByTestId("page-next")[0]);

  expect(screen.getByText(charge_name + "20").textContent).toBe(
    charge_name + "20",
  );
  expect(screen.getByText(email + "20").textContent).toBe(email + "20");
});
