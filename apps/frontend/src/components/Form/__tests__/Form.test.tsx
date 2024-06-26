import * as z from "zod";

import { Button } from "@/components/Elements/Button";
import {
  rtlRender,
  screen,
  waitFor,
  userEvent,
  test,
  expect,
  vitest,
} from "@/test/test-utils";

import { Form } from "../Form";
import { InputField } from "../InputField";

const testData = {
  title: "Hello World",
};

const required = "Required";
const schema = z.object({
  title: z.string().min(1, required),
});

test("should render and submit a basic Form component", async () => {
  const handleSubmit = vitest.fn();

  rtlRender(
    <Form<typeof testData, typeof schema>
      onSubmit={handleSubmit}
      schema={schema}
      id="my-form"
    >
      {({ register, formState }) => (
        <>
          <InputField
            label="Title"
            error={formState.errors["title"]}
            registration={register("title")}
          />

          <Button name="submit" type="submit" className="w-full">
            Submit
          </Button>
        </>
      )}
    </Form>,
  );

  await userEvent.type(screen.getByLabelText(/title/i), testData.title);

  await userEvent.click(screen.getByRole("button", { name: /submit/i }));

  await waitFor(() =>
    expect(handleSubmit).toHaveBeenCalledWith(testData, expect.anything()),
  );
});

test("should fail submission if validation fails", async () => {
  const handleSubmit = vitest.fn();

  rtlRender(
    <Form<typeof testData, typeof schema>
      onSubmit={handleSubmit}
      schema={schema}
      id="my-form"
    >
      {({ register, formState }) => (
        <>
          <InputField
            label="Title"
            error={formState.errors["title"]}
            registration={register("title")}
          />

          <Button name="submit" type="submit" className="w-full">
            Submit
          </Button>
        </>
      )}
    </Form>,
  );

  await userEvent.click(screen.getByRole("button", { name: /submit/i }));

  await screen.findByRole("alert", { name: required });

  expect(handleSubmit).toHaveBeenCalledTimes(0);
});
