"use client";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { useConfirmationModalAtom } from "@/features/modal/store/useConfirmationModalAtom";

interface ConfirmModalProps {
  open: boolean;
}

function ConfirmModal() {
  const [modal, setModal] = useConfirmationModalAtom();
  const { open, title, desc, buttonText, buttonVariant, action } = modal;

  const resetModal = () => {
    setModal({
      open: false,
      title: "",
      desc: "",
      buttonText: "",
      buttonVariant: "default",
      action: () => {},
    });
  };

  return (
    <Dialog open={open} onOpenChange={resetModal}>
      <DialogContent className="space-y-4 max-w-[448px]">
        <DialogHeader className="space-y-4">
          <DialogTitle>{title}</DialogTitle>
          <DialogDescription>{desc}</DialogDescription>
        </DialogHeader>
        <Button
          variant={buttonVariant}
          onClick={() => {
            action();
            resetModal();
          }}
        >
          {buttonText}
        </Button>
      </DialogContent>
    </Dialog>
  );
}
export default ConfirmModal;
