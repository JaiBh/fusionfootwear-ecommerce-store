"use client";

import { useDepartmentAtom } from "@/features/department/store/useDepartmentAtom";
import DesktopNav from "./DesktopNav";
import MobileNav from "./MobileNav";
import TabletNav from "./TabletNav";
import { useEffect, useState } from "react";
import { Category } from "@/types";
import getCategories from "@/actions/getCategories";

function Navbar() {
  const [{ department }] = useDepartmentAtom();

  const [categories, setCategories] = useState<Category[]>();

  useEffect(() => {
    let mounted = true;

    const fetchCategories = async () => {
      try {
        const res = await getCategories({ department, isArchived: false });
        if (mounted) {
          setCategories(res);
        }
      } catch (err) {
        console.log("Error fetching categories", err);
      }
    };
    fetchCategories();
    return () => {
      mounted = false;
    };
  }, [department]);

  return (
    <nav className="z-20">
      <MobileNav categories={categories}></MobileNav>
      <TabletNav categories={categories}></TabletNav>
      <DesktopNav categories={categories}></DesktopNav>
    </nav>
  );
}
export default Navbar;
