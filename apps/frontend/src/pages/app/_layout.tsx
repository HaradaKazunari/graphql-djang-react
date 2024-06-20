import { Suspense } from "react";

import { Spinner } from "@/components/Elements";
import { MainLayout } from "@/components/Layout";
import { Outlet } from "react-router-dom";

export const Layout = () => {
  return (
    <MainLayout>
      <Suspense
        fallback={
          <div className="h-full w-full flex items-center justify-center">
            <Spinner size="xl" />
          </div>
        }
      >
        <Outlet />
      </Suspense>
    </MainLayout>
  );
};

export default Layout;
