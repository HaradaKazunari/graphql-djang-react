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
import { INT_INVALID, REQUIRED, getValidateRule } from "@/utils/validate";
import { ProjectDetail, ProjectDetailsForm } from "../..";
import { Form } from "@/components/Form";
import { Button } from "@/components/Elements";

const schema = getValidateRule(["project_detail"]);

test("should render project detail form", async () => {
  rtlRender(
    <Form<ProjectDetail, typeof schema>
      id="create-Estimate"
      onSubmit={() => {}}
      schema={schema}
    >
      {({ register, formState, ...formProps }) => (
        <>
          <div className="flex gap-4">
            <ProjectDetailsForm
              register={register}
              formState={formState}
              {...formProps}
            />
            <div className="flex justify-center !mt-32">
              <Button type="submit" className="w-fit">
                登録
              </Button>
            </div>
          </div>
        </>
      )}
    </Form>,
    {
      wrapper: AppProvider,
    },
  );

  await waitForLoadingToFinish();

  expect(screen.getByText("製品名")).not.toBeNull();
  expect(screen.getByText("型番")).not.toBeNull();
  expect(screen.getByText("数量")).not.toBeNull();
  expect(screen.getByText("単位")).not.toBeNull();
  expect(screen.getByText("単価")).not.toBeNull();
  expect(screen.getByText("金額")).not.toBeNull();
  expect(screen.getByText("備考")).not.toBeNull();

  expect(screen.queryAllByRole("textbox")).toHaveLength(0);
});

test("should add detail array from", async () => {
  rtlRender(
    <Form<ProjectDetail, typeof schema>
      id="create-Estimate"
      onSubmit={() => {}}
      schema={schema}
    >
      {({ register, formState, ...formProps }) => (
        <>
          <div className="flex gap-4">
            <ProjectDetailsForm
              register={register}
              formState={formState}
              {...formProps}
            />
            <div className="flex justify-center !mt-32">
              <Button type="submit" className="w-fit">
                登録
              </Button>
            </div>
          </div>
        </>
      )}
    </Form>,
    {
      wrapper: AppProvider,
    },
  );

  expect(screen.queryAllByRole("textbox")).toHaveLength(0);

  await userEvent.click(screen.getByRole("button", { name: "" }));
  expect(screen.getAllByRole("combobox")).toHaveLength(3);
  expect(screen.getAllByRole("textbox")).toHaveLength(1);
  expect(screen.getAllByRole("spinbutton")).toHaveLength(2);

  await userEvent.click(screen.getByRole("button", { name: "" }));
  expect(screen.getAllByRole("combobox")).toHaveLength(6);
  expect(screen.getAllByRole("textbox")).toHaveLength(2);
  expect(screen.getAllByRole("spinbutton")).toHaveLength(4);
});

test("should suggest project detail when input product name", async () => {
  const detail = createProjectDetail();
  rtlRender(
    <Form<ProjectDetail, typeof schema>
      id="create-Estimate"
      onSubmit={() => {}}
      schema={schema}
    >
      {({ register, formState, ...formProps }) => (
        <>
          <div className="flex gap-4">
            <ProjectDetailsForm
              register={register}
              formState={formState}
              {...formProps}
            />
            <div className="flex justify-center !mt-32">
              <Button type="submit" className="w-fit">
                登録
              </Button>
            </div>
          </div>
        </>
      )}
    </Form>,
    {
      wrapper: AppProvider,
    },
  );

  await userEvent.click(screen.getByRole("button", { name: "" }));

  await userEvent.type(
    screen.queryAllByRole("combobox")[0],
    detail.product_name.slice(0, 3),
  );

  expect(screen.queryAllByText(detail.product_name)).toHaveLength(1);
  expect(screen.queryAllByText(detail.model_name)).toHaveLength(1);
  expect(screen.queryAllByText(detail.product_name.slice(0, 3))).toHaveLength(
    1,
  );
});

test("should not suggest project detail when only input model name", async () => {
  const detail = createProjectDetail();
  rtlRender(
    <Form<ProjectDetail, typeof schema>
      id="create-Estimate"
      onSubmit={() => {}}
      schema={schema}
    >
      {({ register, formState, ...formProps }) => (
        <>
          <div className="flex gap-4">
            <ProjectDetailsForm
              register={register}
              formState={formState}
              {...formProps}
            />
            <div className="flex justify-center !mt-32">
              <Button type="submit" className="w-fit">
                登録
              </Button>
            </div>
          </div>
        </>
      )}
    </Form>,
    {
      wrapper: AppProvider,
    },
  );

  await userEvent.click(screen.getByRole("button", { name: "" }));

  await userEvent.type(
    screen.queryAllByRole("combobox")[1],
    detail.model_name.slice(0, 3),
  );

  expect(screen.queryByText(detail.product_name)).toBeNull();
  expect(screen.queryByText(detail.model_name)).toBeNull();
  expect(screen.queryByText(detail.model_name.slice(0, 3))).toBeNull();
});

test("should show validation error of required", async () => {
  rtlRender(
    <Form<ProjectDetail, typeof schema>
      id="create-Estimate"
      onSubmit={() => {}}
      schema={schema}
    >
      {({ register, formState, ...formProps }) => (
        <>
          <div className="flex gap-4">
            <ProjectDetailsForm
              register={register}
              formState={formState}
              {...formProps}
            />
            <div className="flex justify-center !mt-32">
              <Button type="submit" className="w-fit">
                登録
              </Button>
            </div>
          </div>
        </>
      )}
    </Form>,
    {
      wrapper: AppProvider,
    },
  );

  await userEvent.click(screen.getByRole("button", { name: "" }));

  await userEvent.click(screen.getByRole("button", { name: "登録" }));

  expect(screen.getAllByRole("alert", { name: REQUIRED })).toHaveLength(1);
});

test("should show validation error of number when input string", async () => {
  rtlRender(
    <Form<ProjectDetail, typeof schema>
      id="create-Estimate"
      onSubmit={() => {}}
      schema={schema}
    >
      {({ register, formState, ...formProps }) => (
        <>
          <div className="flex gap-4">
            <ProjectDetailsForm
              register={register}
              formState={formState}
              {...formProps}
            />
            <div className="flex justify-center !mt-32">
              <Button type="submit" className="w-fit">
                登録
              </Button>
            </div>
          </div>
        </>
      )}
    </Form>,
    {
      wrapper: AppProvider,
    },
  );

  await userEvent.click(screen.getByRole("button", { name: "" }));
  await userEvent.type(screen.getAllByRole("spinbutton")[0], "test");
  await userEvent.type(screen.getAllByRole("spinbutton")[1], "test");

  await userEvent.click(screen.getByRole("button", { name: "登録" }));

  expect(screen.getAllByRole("alert", { name: INT_INVALID })).toHaveLength(2);
});

test("should not show NaN when delete input row before add 2 row", async () => {
  rtlRender(
    <Form<ProjectDetail, typeof schema>
      id="create-Estimate"
      onSubmit={() => {}}
      schema={schema}
    >
      {({ register, formState, ...formProps }) => (
        <>
          <div className="flex gap-4">
            <ProjectDetailsForm
              register={register}
              formState={formState}
              {...formProps}
            />
            <div className="flex justify-center !mt-32">
              <Button type="submit" className="w-fit">
                登録
              </Button>
            </div>
          </div>
        </>
      )}
    </Form>,
    {
      wrapper: AppProvider,
    },
  );

  await userEvent.click(screen.getByRole("button", { name: "" }));
  await userEvent.click(screen.getByRole("button", { name: "" }));
  await userEvent.type(screen.getAllByRole("textbox")[0], "test");

  await userEvent.click(screen.getByRole("button", { name: "登録" }));

  screen.getAllByRole("textbox").map((elem) => {
    expect(elem.value).not.toBe("NaN");
  });
});
