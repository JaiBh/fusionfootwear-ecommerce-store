import { cn } from "@/lib/utils";
import { ReactNode } from "react";

function Container({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <div className={cn("mx-auto w-[90vw] max-w-[1315px]", className)}>
      {children}
    </div>
  );
}
export default Container;
