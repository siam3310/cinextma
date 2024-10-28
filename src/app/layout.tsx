import type { Metadata, Viewport } from "next";
import { siteConfig } from "@/config/site";
import clsx from "clsx";
import { Poppins } from "@/lib/fonts";
import "../styles/globals.css";
import Providers from "./providers";
import TopNavbar from "@/components/ui/layout/TopNavbar";
import BottomNavbar from "@/components/ui/layout/BottomNavbar";


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

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode; }>) {
  return (
    <html suppressHydrationWarning lang="en">
      <body className={clsx("min-h-screen bg-background antialiased select-none", Poppins.className)}>
        <Providers themeProps={{ attribute: "class", defaultTheme: "dark" }}>
          <TopNavbar></TopNavbar>
          <main className="container mx-auto max-w-6xl pt-8 pb-24 md:pb-8 px-2 md:px-5">
            {children}
          </main>
          <BottomNavbar></BottomNavbar>
        </Providers>
      </body>
    </html>
  );
}
