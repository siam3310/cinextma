import { Suspense } from "react";
import DiscoverList from "@/app/discover/DiscoverList";

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
