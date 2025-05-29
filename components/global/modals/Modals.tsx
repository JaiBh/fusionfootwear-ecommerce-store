"use client";

import { useEffect, useState } from "react";
import ConfirmModal from "./ConfirmModal";

function Modals() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return;
  return (
    <>
      <ConfirmModal></ConfirmModal>
    </>
  );
}
export default Modals;
