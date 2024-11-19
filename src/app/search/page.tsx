import { siteConfig } from "@/config/site";
import dynamic from "next/dynamic";
import { Metadata } from "next/types";

const SearchList = dynamic(() => import("./SearchList"), { ssr: false });

export const metadata: Metadata = {
  title: `Search Movies | ${siteConfig.name}`,
};

export default function SearchPage() {
  return (
    <>
      <SearchList />
    </>
  );
}
