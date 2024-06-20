import { LoginForm } from "@/features/auth";
import { AuthLayout } from "@/components/Layout";
import { redirect } from "@/utils/redirect";
import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
} from "@/components/Elements";

export const Login = () => {
  return (
    <AuthLayout>
      <Card>
        <CardHeader>
          <CardTitle>ログイン</CardTitle>
        </CardHeader>
        <CardContent>
          <LoginForm onSuccess={() => redirect("/app")} />
        </CardContent>
      </Card>
    </AuthLayout>
  );
};

export default Login;
