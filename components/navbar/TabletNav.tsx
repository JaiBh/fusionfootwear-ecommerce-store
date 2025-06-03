"use client";

import { useEffect, useState } from "react";
import { ModeToggle } from "../ui/mode-toggle";
import Logo from "../global/Logo";
import NavSearchForm from "./NavSearchForm";
import NavSidebar from "./NavSidebar";
import { Category } from "@/types";
import SavedProductsLink from "./SavedProductsLink";
import CartLink from "./CartLink";
import { cn } from "@/lib/utils";
import RouteLink from "../global/RouteLink";

function TabletNav({
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
      <div className="max-md:hidden lg:hidden grid grid-cols-[auto_1fr_auto] gap-6 py-3 px-3 border-b-[1px]">
        <div className="flex items-center gap-4">
          <NavSidebar
            toggleSidebar={() => setOpen(!open)}
            department={department}
            categories={categories}
          ></NavSidebar>
          <RouteLink
            className={cn(
              "flex items-center gap-2",
              !mounted && "cursor-not-allowed"
            )}
            href={department === "Female" ? "/womens" : "/mens"}
          >
            <Logo></Logo>
            <h2 className="text-present-2 text-primary">FusionFootwear</h2>
          </RouteLink>
        </div>
        <NavSearchForm></NavSearchForm>
        <div className="flex items-center gap-4">
          <SavedProductsLink></SavedProductsLink>
          <CartLink></CartLink>
          <ModeToggle></ModeToggle>
        </div>
      </div>
    </>
  );
}
export default TabletNav;
