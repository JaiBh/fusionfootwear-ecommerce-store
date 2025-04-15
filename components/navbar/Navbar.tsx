"use client";

import { useDepartmentAtom } from "@/features/department/store/useDepartmentAtom";
import DesktopNav from "./DesktopNav";
import MobileNav from "./MobileNav";
import TabletNav from "./TabletNav";
import { useEffect, useState } from "react";
import { Category } from "@/types";
import getCategories from "@/actions/getCategories";

function Navbar() {
  const [{ department }, setDepartment] = useDepartmentAtom();

  const [categories, setCategories] = useState<Category[]>();

  useEffect(() => {
    const fetchCategories = async () => {
      const res = await getCategories(department);
      setCategories(res);
    };
    fetchCategories();
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
