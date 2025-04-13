"use client";

import { Heart, Menu, Search, ShoppingCart } from "lucide-react";
import Link from "next/link";
import { useState } from "react";
import { ModeToggle } from "../ui/mode-toggle";
import Logo from "../Logo";
import { useDepartmentAtom } from "@/features/department/store/useDepartmentAtom";
import NavSidebar from "./NavSidebar";

function MobileNav() {
  const [open, setOpen] = useState(false);
  const [{ department }, setDepartment] = useDepartmentAtom();
  return (
    <>
      <NavSidebar isOpen={open} setOpen={() => setOpen(!open)}></NavSidebar>

      <div className="md:hidden flex items-center justify-between py-3 px-3 border-b-[1px]">
        <div className="flex items-center gap-4">
          <button className="cursor-pointer">
            <Menu size={32} onClick={() => setOpen(!open)}></Menu>
          </button>
          <Link href={department === "Female" ? "/womens" : "/mens"}>
            <Logo></Logo>
          </Link>
        </div>
        <div className="flex items-center gap-4">
          <Link href={"/search"} className="hover:text-primary transition">
            <Search className="size-6"></Search>
          </Link>
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
export default MobileNav;
