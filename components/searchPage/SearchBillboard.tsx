"use client";

import searchBillboard from "@/assets/searchBillboard.jpg";
import Image from "next/image";
import { useSearchParams } from "next/navigation";

function SearchBillboard() {
  const searchParams = useSearchParams();
  const searchTerm = searchParams.get("search");
  return (
    <section className="relative max-h-[40vh] aspect-[13_/_7] w-full bg-grey-900">
      <div className="absolute top-0 left-0 w-full h-full bg-grey-900/30 z-10 flex items-center justify-center">
        <h1 className="text-present-1 text-white truncate px-6 bg-black/60 py-2">
          {searchTerm ? `"${searchTerm}"` : "Search"}
        </h1>
      </div>
      <Image
        src={searchBillboard}
        priority
        alt={`search billboard`}
        className="object-cover"
        fill
      ></Image>
    </section>
  );
}
export default SearchBillboard;
