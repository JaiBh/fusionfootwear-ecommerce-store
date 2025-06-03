"use client";

import { Search } from "lucide-react";
import { Input } from "../ui/input";
import { useTransition } from "react";
import { usePathname, useRouter } from "next/navigation";
import { useLoadingAtom } from "@/features/global/store/useLoadingAtom";
import { useSearchTermAtom } from "@/features/search/store/useSearchTermAtom";

function NavSearchForm() {
  const [isPending, startTransition] = useTransition();
  const [_, setLoadingAtom] = useLoadingAtom();
  const router = useRouter();
  const pathname = usePathname();
  const [searchTerm, setSearchTermAtom] = useSearchTermAtom();

  return (
    <form
      className="relative h-full"
      onSubmit={(e) => {
        e.preventDefault();
        if (!searchTerm.length) return;
        if (pathname !== "/search") {
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
        onChange={(e) => setSearchTermAtom(e.target.value)}
        className="h-full w-full bg-white rounded-3xl pr-12"
        placeholder="Search for items..."
      ></Input>
    </form>
  );
}
export default NavSearchForm;
