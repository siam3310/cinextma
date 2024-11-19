import { Suspense } from "react";
import DiscoverList from "@/app/discover/DiscoverList";
import { Metadata } from "next/types";
import { siteConfig } from "@/config/site";

export const metadata: Metadata = {
  title: `Discover Movies | ${siteConfig.name}`,
};

export default function DiscoverPage() {
  return (
    <>
      <h1 className="mb-14 text-center">Discover Movies</h1>
      <Suspense>
        <DiscoverList />
      </Suspense>
    </>
  );
}
