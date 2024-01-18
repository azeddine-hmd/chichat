"use client";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
// import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import GlobalTemplate from "./global";

const queryClient = new QueryClient();

export type GlobalTemplateConfigProps = {
  children?: React.ReactNode;
};

export default function GlobalTemplateConfig({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <QueryClientProvider client={queryClient}>
        <GlobalTemplate>{children}</GlobalTemplate>
        {/* <ReactQueryDevtools /> */}
      </QueryClientProvider>
    </>
  );
}
