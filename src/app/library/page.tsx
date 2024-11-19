import React from "react";
import LibraryList from "./LibraryList";
import { siteConfig } from "@/config/site";
import { Metadata } from "next/types";

export const metadata: Metadata = {
  title: `Library | ${siteConfig.name}`,
};

export default function Library() {
  return (
    <>
      <LibraryList />
    </>
  );
}
