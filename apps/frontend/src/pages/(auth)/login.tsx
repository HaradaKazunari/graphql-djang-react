import { AuthLayout } from "@/components/Layout";
import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
} from "@/components/Elements";
import { CategoryList } from "@/features/graph/components";

export const Login = () => {
  return (
    <AuthLayout>
      <Card>
        <CardHeader>
          <CardTitle>ログイン</CardTitle>
        </CardHeader>
        <CardContent>
          <CategoryList />
        </CardContent>
      </Card>
    </AuthLayout>
  );
};

export default Login;
