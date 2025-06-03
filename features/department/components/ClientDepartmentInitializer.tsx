"use client";

import { useEffect } from "react";
import { useDepartmentAtom } from "../store/useDepartmentAtom";

export default function ClientDepartmentInitializer({
  department,
}: {
  department: string;
}) {
  const {
    department: departmentStore,
    setDepartmentAtom,
    hydrate,
  } = useDepartmentAtom();

  useEffect(() => {
    if (!hydrate) return;
    if (department === "mens") {
      if (departmentStore !== "Male") {
        setDepartmentAtom("Male");
      }
    } else if (department === "womens") {
      if (departmentStore !== "Female") {
        setDepartmentAtom("Female");
      }
    }
  }, [department, departmentStore, setDepartmentAtom, hydrate]);

  return null;
}
