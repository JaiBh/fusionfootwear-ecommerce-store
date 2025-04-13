import { atom, useAtom } from "jotai";

const departmentState = atom<{ department: "Male" | "Female" }>({
  department: "Male",
});

export const useDepartmentAtom = () => {
  return useAtom(departmentState);
};
