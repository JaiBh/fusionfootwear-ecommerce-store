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
      if (departmentStore !== "mens") {
        setDepartmentAtom("mens");
      }
    } else if (department === "womens") {
      if (departmentStore !== "womens") {
        setDepartmentAtom("womens");
      }
    }
  }, [department, departmentStore, setDepartmentAtom, hydrate]);

  return null;
}
