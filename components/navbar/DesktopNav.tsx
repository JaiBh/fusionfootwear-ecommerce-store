"use client";

import { ModeToggle } from "../ui/mode-toggle";
import Logo from "../global/Logo";
import NavSearchForm from "./NavSearchForm";
import { useDepartmentAtom } from "@/features/department/store/useDepartmentAtom";
import { cn } from "@/lib/utils";
import AccountDropdown from "./AccountDropdown";
import { Category } from "@/types";
import SavedProductsLink from "./SavedProductsLink";
import CartLink from "./CartLink";
import { useEffect, useState } from "react";
import RouteLink from "../global/RouteLink";
import { usePathname } from "next/navigation";

function DesktopNav({ categories }: { categories: Category[] | undefined }) {
  const [{ department }] = useDepartmentAtom();
  const pathname = usePathname();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <>
      <div className="max-lg:hidden grid grid-cols-[auto_auto_1fr_auto] gap-6 px-6 max-w-[1315px] mx-auto">
        <RouteLink
          className={cn(
            "flex items-center gap-2 py-3",
            !mounted && "cursor-not-allowed"
          )}
          href={department === "Female" ? "/womens" : "/mens"}
        >
          <Logo></Logo>
          <h2 className="text-present-2 text-primary">FusionFootwear</h2>
        </RouteLink>
        <div className="grid grid-cols-2 text-center">
          <RouteLink
            href={"/mens"}
            className={cn(
              "p-4 bg-background transition border-l text-present-3 font-semibold",
              mounted && department === "Male"
                ? "bg-primary text-white"
                : "hover:bg-primary-10 dark:hover:bg-secondary"
            )}
          >
            Men
          </RouteLink>
          <RouteLink
            href={"/womens"}
            className={cn(
              "p-4 bg-background transition border-r text-present-3 font-semibold",
              mounted && department === "Female"
                ? "bg-primary text-white"
                : "hover:bg-primary-10 dark:hover:bg-secondary"
            )}
          >
            Women
          </RouteLink>
        </div>
        <div className="py-3">
          <NavSearchForm></NavSearchForm>
        </div>
        <div className="flex items-center gap-4 py-3">
          <AccountDropdown></AccountDropdown>
          <SavedProductsLink></SavedProductsLink>
          <CartLink></CartLink>

          <ModeToggle></ModeToggle>
        </div>
      </div>
      <div
        className={cn(
          "bg-secondary",
          (!categories || categories.length < 1) && "hidden"
        )}
      >
        <div className="max-lg:hidden max-w-[1315px] mx-auto">
          <ul className="flex items-center">
            {categories ? (
              categories.map((category) => (
                <RouteLink
                  key={category.id}
                  href={`/${department === "Female" ? "womens" : "mens"}/${category.id}`}
                  className={cn(
                    "block p-4 text-present-4 transition hover:bg-primary hover:text-white",
                    pathname.includes(category.id) &&
                      "bg-primary text-[#ffffff] !text-present-4"
                  )}
                >
                  {category.name}
                </RouteLink>
              ))
            ) : (
              <p className="p-4 text-present-4">Loading...</p>
            )}
          </ul>
        </div>
      </div>
    </>
  );
}
export default DesktopNav;
