import { Suspense } from "react";
import SearchList from "./SearchList";

export default function SearchPage() {
  return (
    <div>
      <Suspense>
        <SearchList />
      </Suspense>
    </div>
  );
}
