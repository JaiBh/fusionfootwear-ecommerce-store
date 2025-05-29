import { atom, useAtom } from "jotai";

const confirmationModalState = atom<{
  open: boolean;
  title: string;
  desc?: string;
  buttonText: string;
  buttonVariant: "default" | "destructive";
  action: () => void;
}>({
  open: false,
  title: "",
  desc: "",
  buttonText: "",
  buttonVariant: "default",
  action: () => {},
});

export const useConfirmationModalAtom = () => {
  return useAtom(confirmationModalState);
};
