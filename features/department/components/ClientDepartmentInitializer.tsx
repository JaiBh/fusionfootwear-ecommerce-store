// components/ClientDepartmentInitializer.tsx
"use client";

import { useEffect } from "react";
import { useDepartmentAtom } from "../store/useDepartmentAtom";

export default function ClientDepartmentInitializer({
  department,
}: {
  department: string;
}) {
  const [_, setDepartment] = useDepartmentAtom();

  useEffect(() => {
    if (department === "mens") {
      setDepartment({ department: "Male" });
    } else if (department === "womens") {
      setDepartment({ department: "Female" });
    }
  }, [department]);

  return null; // doesn't render anything
}
