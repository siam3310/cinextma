import { FaGithub } from "react-icons/fa6";
import { siteConfig } from "@/config/site";
import Link from "next/link";
import { Metadata } from "next/dist/lib/metadata/types/metadata-interface";
import dynamic from "next/dynamic";
import { Suspense } from "react";
const FAQ = dynamic(() => import("./FAQ"));

export const metadata: Metadata = {
  title: `About | ${siteConfig.name}`,
};

export default function AboutPage() {
  return (
    <div className="flex w-full justify-center">
      <div className="flex w-full max-w-2xl flex-col gap-5">
        <Suspense>
          <FAQ />
        </Suspense>
        <Link target="_blank" href={siteConfig.socials.github} className="flex justify-center">
          <FaGithub size={30} />
        </Link>
      </div>
    </div>
  );
}
