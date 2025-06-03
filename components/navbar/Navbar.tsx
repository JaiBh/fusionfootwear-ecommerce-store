"use client";

import { useDepartmentAtom } from "@/features/department/store/useDepartmentAtom";
import DesktopNav from "./DesktopNav";
import MobileNav from "./MobileNav";
import TabletNav from "./TabletNav";
import { useEffect, useState } from "react";
import { Category } from "@/types";
import getCategories from "@/actions/getCategories";

function Navbar() {
  const { department, hydrate } = useDepartmentAtom();

  const [categories, setCategories] = useState<Category[]>();

  useEffect(() => {
    if (!hydrate) return;
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
  }, [department, hydrate]);

  return (
    <nav className="z-20">
      <MobileNav categories={categories} department={department}></MobileNav>
      <TabletNav categories={categories} department={department}></TabletNav>
      <DesktopNav categories={categories} department={department}></DesktopNav>
    </nav>
  );
}
export default Navbar;
