import { Metadata } from "next/types";
import { siteConfig } from "@/config/site";
import dynamic from "next/dynamic";

const DiscoverList = dynamic(() => import("@/app/discover/DiscoverList"), { ssr: false });

export const metadata: Metadata = {
  title: `Discover Movies | ${siteConfig.name}`,
};

export default function DiscoverPage() {
  return (
    <>
      <h1 className="mb-14 text-center">Discover Movies</h1>
      <DiscoverList />
    </>
  );
}
