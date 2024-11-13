import dynamic from "next/dynamic";

const SearchList = dynamic(() => import("./SearchList"), { ssr: false });

export default function SearchPage() {
  return (
    <>
      <SearchList />
    </>
  );
}
