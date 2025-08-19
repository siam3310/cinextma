"use client";

import { PropsWithChildren, Suspense } from "react";
import { HeroUIProvider, Spinner } from "@heroui/react";
import { ThemeProvider as NextThemesProvider } from "next-themes";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { AppProgressProvider as ProgressProvider } from "@bprogress/next";
import { Toaster } from "sonner";
import { FaCheck, FaExclamation, FaInfo } from "react-icons/fa6";
import { ImCross } from "react-icons/im";
import { NuqsAdapter } from "nuqs/adapters/next/app";
import { usePathname, useRouter } from "next/navigation";

const queryClient = new QueryClient();

export default function Providers({ children }: PropsWithChildren) {
  const router = useRouter();
  const pathName = usePathname();
  const tv = pathName.includes("/tv/");

  return (
    <QueryClientProvider client={queryClient}>
      <HeroUIProvider navigate={router.push}>
        <NextThemesProvider attribute="class" defaultTheme="dark" enableSystem>
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
            icons={{
              success: <FaCheck className="text-success" />,
              info: <FaInfo className="text-sky-500" />,
              warning: <FaExclamation className="text-warning" />,
              error: <ImCross className="text-danger" />,
              loading: <Spinner size="sm" />,
            }}
          />
          <NuqsAdapter>
            {/* NOTE: https://github.com/vercel/next.js/discussions/61654 */}
            <Suspense>
              <ProgressProvider color={tv ? "#f5a524" : "#006fee"} options={{ showSpinner: false }}>
                {children}
              </ProgressProvider>
            </Suspense>
          </NuqsAdapter>
        </NextThemesProvider>
      </HeroUIProvider>
      <div className="hidden md:block">
        <ReactQueryDevtools initialIsOpen={false} />
      </div>
    </QueryClientProvider>
  );
}
