"use client";

import { useState, useEffect } from "react";
import { DiscoverPosterCard } from "@/app/discover/DiscoverPosterCard";
import { useQuery } from "@tanstack/react-query";
import { Pagination } from "@nextui-org/react";
import { useSearchParams } from "next/navigation";
import { useRouter } from "next-nprogress-bar";
import { SkeletonDiscoverPosterCard } from "@/app/discover/SkeletonDiscoverPosterCard";
import { tmdb } from "@/api/tmdb";

export default function DiscoverList() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const pageQuery = searchParams.get("page");
  const [page, setPage] = useState<number>(typeof pageQuery === "string" && !isNaN(parseInt(pageQuery)) ? parseInt(pageQuery) : 1);

  const { data, isPending } = useQuery({
    queryFn: () => tmdb.discover.movie({ page: page }),
    queryKey: ["discover-movies", page],
  });

  // const totalResults = new Intl.NumberFormat().format(data?.total_results);

  const handlePageChange = (newPage: number) => {
    setPage(newPage);
    router.push(`?page=${newPage}`);
  };

  useEffect(() => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  }, [page]);

  if (!isPending) console.log(data);

  return (
    <div className="flex flex-col items-center gap-16">
      <>
        {isPending ? (
          <div className="grid size-full grid-cols-2 gap-2 sm:grid-cols-3 md:grid-cols-5 md:gap-5 xl:grid-cols-6">
            {Array.from({ length: 20 }, (_, index) => (
              <SkeletonDiscoverPosterCard key={index} />
            ))}
          </div>
        ) : (
          <div className="grid size-full grid-cols-2 gap-2 sm:grid-cols-3 md:gap-5 lg:grid-cols-5 xl:grid-cols-6">
            {data?.results.map((movie: any) => {
              return <DiscoverPosterCard key={movie.id} movie={movie} />;
            })}
          </div>
        )}
      </>
      <Pagination
        showControls
        total={100}
        initialPage={page} //totalResults
        onChange={handlePageChange}
      />
    </div>
  );
}
