import { useAtom } from "jotai";
import { atomWithStorage } from "jotai/utils";
import { useEffect, useState } from "react";

const departmentState = atomWithStorage<"mens" | "womens">(
  "department",
  "mens"
);

export const useDepartmentAtom = () => {
  const [hydrate, setHydrate] = useState(false);
  const [department, setDepartmentAtom] = useAtom(departmentState);
  useEffect(() => {
    setHydrate(true);
  }, []);
  return { department, setDepartmentAtom, hydrate };
};
