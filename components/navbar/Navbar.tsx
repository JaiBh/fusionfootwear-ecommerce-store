"use client";

import { useDepartmentAtom } from "@/features/department/store/useDepartmentAtom";
import DesktopNav from "./DesktopNav";
import MobileNav from "./MobileNav";
import TabletNav from "./TabletNav";
import { Category } from "@/types";
import getCategories from "@/actions/getCategories";
import { useQuery } from "@tanstack/react-query";

function Navbar() {
  const { department, hydrate } = useDepartmentAtom();

  const {
    data: categories = [],
    isLoading,
    isFetching,
    isError,
    error,
  } = useQuery<Category[]>({
    queryKey: ["categories", department],
    queryFn: () =>
      getCategories({
        department,
        isArchived: false,
      }),
    enabled: hydrate && !!department, // wait for atom hydration
    staleTime: 5 * 60 * 1000, // cache for 5 min
    gcTime: 30 * 60 * 1000,
    placeholderData: (prev) => prev ?? [], // keep previous while refetching
    retry: 1,
  });

  if (isError) {
    console.log("Error fetching categories", error);
  }

  return (
    <nav className="z-20">
      <MobileNav categories={categories} department={department} />
      <TabletNav categories={categories} department={department} />
      <DesktopNav categories={categories} department={department} />
    </nav>
  );
}

export default Navbar;
