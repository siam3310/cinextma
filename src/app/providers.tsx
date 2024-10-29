"use client";

import React from "react";
import { NextUIProvider } from "@nextui-org/react";
import { ThemeProvider as NextThemesProvider } from "next-themes";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { AppProgressBar as ProgressBar, useRouter } from "next-nprogress-bar";
import { Toaster } from "sonner";

const queryClient = new QueryClient();

export interface ProvidersProps {
  children: React.ReactNode;
}

export default function Providers({ children }: ProvidersProps) {
  const router = useRouter();

  return (
    <QueryClientProvider client={queryClient}>
      <NextUIProvider navigate={router.push}>
        <NextThemesProvider attribute="class" defaultTheme="dark" enableSystem>
          <ProgressBar color="#0072F5" options={{ showSpinner: false }} />
          <Toaster
            position="top-right"
            toastOptions={{
              classNames: {
                toast: "toast__container",
                title: "toast__title",
                icon: "toast__title",
                description: "toast__description",
              },
            }}
          />
          {children}
        </NextThemesProvider>
      </NextUIProvider>
      <div className="hidden md:block">
        <ReactQueryDevtools initialIsOpen={false} />
      </div>
    </QueryClientProvider>
  );
}
