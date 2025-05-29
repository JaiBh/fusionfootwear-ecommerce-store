import { useAtom } from "jotai";
import { atomWithStorage } from "jotai/utils";

const departmentState = atomWithStorage<{ department: "Male" | "Female" }>(
  "department",
  {
    department: "Male",
  }
);

export const useDepartmentAtom = () => {
  return useAtom(departmentState);
};
