"use client";

import { Search } from "lucide-react";
import { Input } from "../ui/input";
import { useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";

function NavSearchForm() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const [searchTerm, setSearchTerm] = useState(
    searchParams.get("search") || ""
  );

  return (
    <form
      className="relative"
      onSubmit={(e) => {
        e.preventDefault();
        if (!searchTerm) return;
        router.push(`/search?search=${searchTerm}`);
      }}
    >
      <Search
        className="absolute top-[50%] right-[1rem] translate-y-[-50%]"
        size={18}
      ></Search>
      <Input
        type="text"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        className="h-full w-full bg-white rounded-3xl pr-12"
        placeholder="Search for items..."
      ></Input>
    </form>
  );
}
export default NavSearchForm;
