"use client";

import Link from "next/link";
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

function DesktopNav({ categories }: { categories: Category[] | undefined }) {
  const [{ department }] = useDepartmentAtom();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <>
      <div className="max-lg:hidden grid grid-cols-[auto_auto_1fr_auto] gap-6 px-6 max-w-[1315px] mx-auto">
        <Link
          className={cn(
            "flex items-center gap-2 py-3",
            !mounted && "cursor-not-allowed"
          )}
          href={department === "Female" ? "/womens" : "/mens"}
        >
          <Logo></Logo>
          <h2 className="text-present-2 text-primary">FusionFootwear</h2>
        </Link>
        <div className="grid grid-cols-2 text-center">
          <Link
            href={"/mens"}
            className={cn(
              "p-4 bg-background transition border-l text-present-3 font-semibold",
              mounted && department === "Male"
                ? "bg-primary text-white"
                : "hover:bg-primary-10 dark:hover:bg-secondary"
            )}
          >
            Men
          </Link>
          <Link
            href={"/womens"}
            className={cn(
              "p-4 bg-background transition border-r text-present-3 font-semibold",
              mounted && department === "Female"
                ? "bg-primary text-white"
                : "hover:bg-primary-10 dark:hover:bg-secondary"
            )}
          >
            Women
          </Link>
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
                <Link
                  key={category.id}
                  href={`/${department === "Female" ? "womens" : "mens"}/${category.id}`}
                  className="p-4 text-present-4 transition hover:bg-primary hover:text-white"
                >
                  {category.name}
                </Link>
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
