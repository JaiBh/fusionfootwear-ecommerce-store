// components/ClientDepartmentInitializer.tsx
"use client";

import { useEffect } from "react";
import { useDepartmentAtom } from "../store/useDepartmentAtom";

export default function ClientDepartmentInitializer({
  department,
}: {
  department: string;
}) {
  const [{ department: departmentStore }, setDepartment] = useDepartmentAtom();

  useEffect(() => {
    if (department === "mens") {
      if (departmentStore !== "Male") {
        setDepartment({ department: "Male" });
      }
    } else if (department === "womens") {
      if (departmentStore !== "Female") {
        setDepartment({ department: "Female" });
      }
    }
  }, [department, departmentStore, setDepartment]);

  return null; // doesn't render anything
}
