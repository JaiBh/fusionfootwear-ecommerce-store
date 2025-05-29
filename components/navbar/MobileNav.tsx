"use client";

import { useEffect, useState } from "react";
import { ModeToggle } from "../ui/mode-toggle";
import Logo from "../global/Logo";
import { useDepartmentAtom } from "@/features/department/store/useDepartmentAtom";
import NavSidebar from "./NavSidebar";
import { Category } from "@/types";
import SavedProductsLink from "./SavedProductsLink";
import CartLink from "./CartLink";
import { cn } from "@/lib/utils";
import RouteLink from "../global/RouteLink";

function MobileNav({ categories }: { categories: Category[] | undefined }) {
  const [open, setOpen] = useState(false);
  const [{ department }] = useDepartmentAtom();

  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <>
      <div className="md:hidden flex items-center justify-between py-3 px-3 border-b-[1px]">
        <div className="flex items-center gap-4">
          <NavSidebar
            toggleSidebar={() => setOpen(!open)}
            categories={categories}
          ></NavSidebar>

          <RouteLink
            href={department === "Female" ? "/womens" : "/mens"}
            className={cn(
              "flex items-center",
              !mounted && "cursor-not-allowed"
            )}
          >
            <Logo></Logo>
          </RouteLink>
        </div>
        <div className="flex items-center gap-4">
          <SavedProductsLink></SavedProductsLink>
          <CartLink></CartLink>
          <ModeToggle></ModeToggle>
        </div>
      </div>
    </>
  );
}
export default MobileNav;
