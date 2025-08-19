import { siteConfig } from "@/config/site";
import { Metadata } from "next/types";
import { Suspense } from "react";
import dynamic from "next/dynamic";
const LibraryList = dynamic(() => import("./LibraryList"));

export const metadata: Metadata = {
  title: `Library | ${siteConfig.name}`,
};

export default function Library() {
  return (
    <Suspense>
      <LibraryList />
    </Suspense>
  );
}
