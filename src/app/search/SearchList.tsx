// Sorry, I used AI for this page to solve my minor bug about storing histories data to local storage. AI refactored this code for me and I don't know what going on my code (at least for now) so I don't remove the AI generated comments. My original code is in backup.txt file.

"use client";

import { useState, useEffect, useMemo, useCallback } from "react";
import dynamic from "next/dynamic";
import { useQuery } from "@tanstack/react-query";
import { useSearchParams } from "next/navigation";
import { useRouter } from "next-nprogress-bar";
import { useDebouncedValue } from "@mantine/hooks";
import { tmdb } from "@/api/tmdb";
import SearchInput from "@/components/ui/input/SearchInput";
import SearchResults from "./SearchResults";
import { AnimatePresence, motion } from "framer-motion";
import clsx from "clsx";
import { Pagination } from "@nextui-org/react";

// Dynamically import SearchHistory to ensure client-side rendering
const SearchHistory = dynamic(() => import("./SearchHistory"), {
  ssr: false,
  loading: () => <div className="h-20"></div>,
});

// Custom hook for managing search state
const useSearchState = (initialQuery: string, initialPage: number) => {
  const [page, setPage] = useState(initialPage);
  const [searchInput, setSearchInput] = useState(initialQuery);
  const [isSearchTriggered, setIsSearchTriggered] = useState(false);
  const [searchHistories, setSearchHistories] = useState<string[]>(() => {
    if (typeof window !== "undefined") {
      const storedHistories = localStorage.getItem("search-histories");
      return storedHistories ? JSON.parse(storedHistories) : [];
    }
    return [];
  });

  // Update local storage when search histories change
  useEffect(() => {
    if (typeof window !== "undefined") {
      localStorage.setItem("search-histories", JSON.stringify(searchHistories));
    }
  }, [searchHistories]);

  // Add new search term to history
  const addToSearchHistory = useCallback((term: string) => {
    setSearchHistories((prev) => {
      const updatedHistories = new Set([...prev, term]);
      return Array.from(updatedHistories).sort();
    });
  }, []);

  // Reset page if out of bounds
  useEffect(() => {
    if (page > 500 || page < 0) {
      setPage(1);
    }
  }, [page]);

  return {
    page,
    setPage,
    searchInput,
    setSearchInput,
    isSearchTriggered,
    setIsSearchTriggered,
    searchHistories,
    setSearchHistories,
    addToSearchHistory,
  };
};

// Custom hook for handling search query and routing
const useSearchRouting = (
  searchInput: string,
  setPage: (page: number) => void,
  setIsSearchTriggered: (triggered: boolean) => void,
  addToSearchHistory: (term: string) => void,
) => {
  const router = useRouter();
  const [debouncedSearchQuery] = useDebouncedValue(searchInput.trim(), 1000);

  useEffect(() => {
    if (debouncedSearchQuery === "") {
      setIsSearchTriggered(false);
      router.push("/search");
    } else if (debouncedSearchQuery) {
      setIsSearchTriggered(true);
      setPage(1);
      router.push(`?query=${debouncedSearchQuery}`);
      addToSearchHistory(debouncedSearchQuery);
    }
  }, [debouncedSearchQuery, router, setPage, setIsSearchTriggered, addToSearchHistory]);

  return debouncedSearchQuery;
};

export default function SearchList() {
  const router = useRouter();
  const searchParams = useSearchParams();

  // Safely parse initial page and query
  const initialPage = useMemo(() => {
    const pageParam = searchParams.get("page");
    return pageParam ? parseInt(pageParam, 10) : 1;
  }, [searchParams]);

  const initialQuery = useMemo(() => {
    return searchParams.get("query") ?? "";
  }, [searchParams]);

  // Manage search state
  const {
    page,
    setPage,
    searchInput,
    setSearchInput,
    isSearchTriggered,
    setIsSearchTriggered,
    searchHistories,
    setSearchHistories,
    addToSearchHistory,
  } = useSearchState(initialQuery, initialPage);

  // Manage search routing and debounce
  const debouncedSearchQuery = useSearchRouting(searchInput, setPage, setIsSearchTriggered, addToSearchHistory);

  // Fetch search results
  const { data, isPending } = useQuery({
    queryFn: () =>
      tmdb.search.movies({
        query: debouncedSearchQuery,
        page,
        include_adult: true,
      }),
    queryKey: ["search-movie", page, debouncedSearchQuery],
    enabled: !!debouncedSearchQuery,
  });

  // Ensure client-side rendering
  const [isClient, setIsClient] = useState(false);
  useEffect(() => {
    setIsClient(true);
  }, []);

  // Prevent server-side rendering
  if (!isClient) {
    return null;
  }

  // Derived values
  const totalResults = data?.total_results ?? 0;
  const totalPages = data?.total_pages ?? 0;

  // Handle page change
  const handlePageChange = (newPage: number) => {
    setPage(newPage);
    router.push(`?query=${debouncedSearchQuery}&page=${newPage}`);
  };

  return (
    <div className="flex flex-col items-center gap-8">
      <AnimatePresence>
        <div className={clsx("flex w-full max-w-xl flex-col justify-center gap-5 text-center", !isSearchTriggered && "absolute-center p-2")}>
          <motion.div
            layout
            initial={{ opacity: 0, scale: 0.7 }}
            exit={{ opacity: 0, scale: 0.7 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.3 }}
          >
            <SearchInput
              placeholder="Search your favorite movies..."
              isLoading={isPending && isSearchTriggered}
              autoFocus
              value={searchInput}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => setSearchInput(e.target.value)}
            />
          </motion.div>
          <SearchHistory histories={searchHistories} setHistories={setSearchHistories} setSearchInput={setSearchInput} />
        </div>
      </AnimatePresence>

      {isSearchTriggered && (
        <>
          <SearchResults isLoading={isPending} totalResults={totalResults} movies={data?.results ?? []} query={debouncedSearchQuery} />
          <Pagination showControls total={totalPages} initialPage={page} onChange={handlePageChange} />
        </>
      )}
    </div>
  );
}
