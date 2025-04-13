"use client";

import { Heart, Menu, ShoppingCart } from "lucide-react";
import Link from "next/link";
import { useState } from "react";
import { ModeToggle } from "../ui/mode-toggle";
import Logo from "../Logo";
import NavSearchForm from "./NavSearchForm";
import { useDepartmentAtom } from "@/features/department/store/useDepartmentAtom";
import NavSidebar from "./NavSidebar";

function TabletNav() {
  const [open, setOpen] = useState(false);
  const [{ department }, setDepartment] = useDepartmentAtom();

  return (
    <>
      <NavSidebar isOpen={open} setOpen={() => setOpen(!open)}></NavSidebar>

      <div className="max-md:hidden lg:hidden grid grid-cols-[auto_1fr_auto] gap-6 py-3 px-3 border-b-[1px]">
        <div className="flex items-center gap-4">
          <button className="cursor-pointer">
            <Menu size={32} onClick={() => setOpen(!open)}></Menu>
          </button>
          <Link
            className="flex items-center gap-2"
            href={department === "Female" ? "/womens" : "/mens"}
          >
            <Logo></Logo>
            <h2 className="text-present-4-bold text-primary">FusionFootwear</h2>
          </Link>
        </div>
        <NavSearchForm></NavSearchForm>
        <div className="flex items-center gap-4">
          <Link href={"/saved"} className="hover:text-primary transition">
            <Heart className="size-6"></Heart>
          </Link>
          <Link href={"/cart"} className="hover:text-primary transition">
            <ShoppingCart className="size-6"></ShoppingCart>
          </Link>
          <ModeToggle></ModeToggle>
        </div>
      </div>
    </>
  );
}
export default TabletNav;
