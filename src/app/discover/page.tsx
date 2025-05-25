import { Metadata } from "next/types";
import { siteConfig } from "@/config/site";
import dynamic from "next/dynamic";
import { Suspense } from "react";

const DiscoverList = dynamic(() => import("@/app/discover/DiscoverList"));

export const metadata: Metadata = {
  title: `Discover Movies | ${siteConfig.name}`,
};

export default function DiscoverPage() {
  return (
    <Suspense>
      <h1 className="mb-14 text-center">Discover Movies</h1>
      <DiscoverList />
    </Suspense>
  );
}
