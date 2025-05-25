import { siteConfig } from "@/config/site";
import dynamic from "next/dynamic";
import { Metadata } from "next/types";
import { Suspense } from "react";

const SearchList = dynamic(() => import("./SearchList"));

export const metadata: Metadata = {
  title: `Search Movies | ${siteConfig.name}`,
};

export default function SearchPage() {
  return (
    <Suspense>
      <SearchList />
    </Suspense>
  );
}
