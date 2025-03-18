"use client";

import { cn } from "@/lib/utils";
import { LucideIcon } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";

interface MobileNavIconProps {
  Icon: LucideIcon;
  title: string;
  href: string;
}
function MobileNavIcon({ Icon, title, href }: MobileNavIconProps) {
  const pathname = usePathname();
  const selected = pathname === href;
  return (
    <Link
      className={cn(
        "flex flex-col gap-0.5 items-center ",
        selected ? "text-primary font-bold" : "text-[#9098B1]"
      )}
      href={href}
    >
      <Icon className="size-[1.5rem]"></Icon>
      <span className="text-present-6">{title}</span>
    </Link>
  );
}
export default MobileNavIcon;
