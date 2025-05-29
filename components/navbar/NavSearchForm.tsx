"use client";

import { Search } from "lucide-react";
import { Input } from "../ui/input";
import { useState, useTransition } from "react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useLoadingAtom } from "@/features/global/store/useLoadingAtom";

function NavSearchForm() {
  const searchParams = useSearchParams();
  const [isPending, startTransition] = useTransition();
  const [_, setLoadingAtom] = useLoadingAtom();
  const router = useRouter();
  const pathname = usePathname();
  const [searchTerm, setSearchTerm] = useState(
    searchParams.get("search") || ""
  );

  return (
    <form
      className="relative h-full"
      onSubmit={(e) => {
        e.preventDefault();
        if (!searchTerm) return;
        if (pathname !== "/search") {
          console.log("HELLO");
          setLoadingAtom({ isLoading: true });
          startTransition(() => {
            router.push(`/search?search=${searchTerm}`);
          });
        } else {
          router.push(`/search?search=${searchTerm}`);
        }
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
