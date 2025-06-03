"use client";

import { useEffect, useState } from "react";
import { ModeToggle } from "../ui/mode-toggle";
import Logo from "../global/Logo";
import NavSidebar from "./NavSidebar";
import { Category } from "@/types";
import SavedProductsLink from "./SavedProductsLink";
import CartLink from "./CartLink";
import { cn } from "@/lib/utils";
import RouteLink from "../global/RouteLink";
import SearchSheet from "./SearchSheet";

function MobileNav({
  categories,
  department,
}: {
  categories: Category[] | undefined;
  department: "Male" | "Female";
}) {
  const [open, setOpen] = useState(false);

  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <>
      <div className="flex md:hidden items-center justify-between py-3 px-3 border-b-[1px]">
        <div className="flex items-center gap-4">
          <NavSidebar
            department={department}
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
          <SearchSheet></SearchSheet>
          <SavedProductsLink></SavedProductsLink>
          <CartLink></CartLink>
          <ModeToggle></ModeToggle>
        </div>
      </div>
    </>
  );
}
export default MobileNav;
