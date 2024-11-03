import type { Metadata, Viewport } from "next";
import { siteConfig } from "@/config/site";
import clsx from "clsx";
import { Poppins } from "@/lib/fonts";
import "../styles/globals.css";
import Providers from "./providers";
import TopNavbar from "@/components/ui/layout/TopNavbar";
import BottomNavbar from "@/components/ui/layout/BottomNavbar";
import Sidebar from "@/components/ui/layout/Sidebar";
import { Footer } from "@/components/ui/layout/Footer";

export const metadata: Metadata = {
  title: siteConfig.name,
  description: siteConfig.description,
  icons: {
    icon: siteConfig.favicon,
  },
};

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#FFFFFF" },
    { media: "(prefers-color-scheme: dark)", color: "#0D0C0F" },
  ],
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html suppressHydrationWarning lang="en">
      <body className={clsx("min-h-screen select-none bg-background antialiased", Poppins.className)}>
        <Providers>
          <TopNavbar />
          <Sidebar>
            <main className="container mx-auto max-w-full px-2 pb-8 pt-8 sm:px-5">{children}</main>
          </Sidebar>
          {/* <Footer /> */}
          <BottomNavbar />
        </Providers>
      </body>
    </html>
  );
}
