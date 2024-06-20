import * as React from "react";
import { ErrorBoundary } from "react-error-boundary";
import { HelmetProvider } from "react-helmet-async";
import { QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { RecoilRoot } from "recoil";

import { Spinner } from "@/components/Elements";
import { Notifications } from "@/components/Notifications";
import { AuthLoader } from "@/lib/auth";
import { LoaderComponent, ErrorFallback } from "@/features/misc";
import { queryClient } from "@/lib/react-query";
import { ENV } from "@/config";

type AppProviderProps = {
  children: React.ReactNode;
};

export const AppProvider = ({ children }: AppProviderProps) => {
  return (
    <React.Suspense
      fallback={
        <div className="flex items-center justify-center w-screen h-screen">
          <Spinner size="xl" />
        </div>
      }
    >
      <RecoilRoot>
        <ErrorBoundary FallbackComponent={ErrorFallback}>
          <HelmetProvider>
            <QueryClientProvider client={queryClient}>
              {ENV !== "test" && <ReactQueryDevtools />}
              <Notifications />
              <AuthLoader renderLoading={LoaderComponent}>
                {children}
              </AuthLoader>
            </QueryClientProvider>
          </HelmetProvider>
        </ErrorBoundary>
      </RecoilRoot>
    </React.Suspense>
  );
};
