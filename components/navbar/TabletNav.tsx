"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { ModeToggle } from "../ui/mode-toggle";
import Logo from "../global/Logo";
import NavSearchForm from "./NavSearchForm";
import { useDepartmentAtom } from "@/features/department/store/useDepartmentAtom";
import NavSidebar from "./NavSidebar";
import { Category } from "@/types";
import SavedProductsLink from "./SavedProductsLink";
import CartLink from "./CartLink";

function TabletNav({ categories }: { categories: Category[] | undefined }) {
  const [open, setOpen] = useState(false);
  const [{ department }] = useDepartmentAtom();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return;

  return (
    <>
      <div className="max-md:hidden lg:hidden grid grid-cols-[auto_1fr_auto] gap-6 py-3 px-3 border-b-[1px]">
        <div className="flex items-center gap-4">
          <NavSidebar
            toggleSidebar={() => setOpen(!open)}
            categories={categories}
          ></NavSidebar>
          <Link
            className="flex items-center gap-2"
            href={department === "Female" ? "/womens" : "/mens"}
          >
            <Logo></Logo>
            <h2 className="text-present-2 text-primary">FusionFootwear</h2>
          </Link>
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
