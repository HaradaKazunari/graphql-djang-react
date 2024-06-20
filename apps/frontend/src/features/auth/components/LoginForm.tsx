import { Button } from "@/components/Elements";
import { Form, InputField, FormField } from "@/components/Form";
import { useLogin } from "@/lib/auth";
import { getValidateRule } from "@/utils/validate";

const schema = getValidateRule(["username", "password"]);

type LoginValues = {
  username: string;
  password: string;
};

type LoginFormProps = {
  onSuccess: () => void;
};

export const LoginForm = ({ onSuccess }: LoginFormProps) => {
  const login = useLogin();

  return (
    <Form<LoginValues, typeof schema>
      onSubmit={(values) => {
        login.mutateAsync(values).then(() => {
          onSuccess();
        });
      }}
      schema={schema}
    >
      {({ control }) => (
        <>
          <FormField
            control={control}
            name="username"
            render={({ field }) => <InputField label="ユーザ名" {...field} />}
          />
          <FormField
            control={control}
            name="password"
            render={({ field }) => <InputField label="パスワード" {...field} />}
          />

          <Button isLoading={login.isPending} type="submit" className="w-full">
            ログイン
          </Button>
        </>
      )}
    </Form>
  );
};
