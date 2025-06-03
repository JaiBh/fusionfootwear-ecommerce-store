import { atom, useAtom } from "jotai";

const searchTermState = atom<string>("");

export const useSearchTermAtom = () => {
  return useAtom(searchTermState);
};
