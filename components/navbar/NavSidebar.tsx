"use client";

import { cn } from "@/lib/utils";
import { useConvexAuth } from "convex/react";
import {
  ArrowRight,
  FileQuestion,
  Info,
  Menu,
  MessageCircle,
  ShoppingBag,
  X,
} from "lucide-react";
import UserAvatar from "./UserAvatar";
import Link from "next/link";
import SidebarLink from "./SidebarLink";
import { Category } from "@/types";
import { useDepartmentAtom } from "@/features/department/store/useDepartmentAtom";
import { FaFacebook, FaInstagram, FaTwitter } from "react-icons/fa";
import { Separator } from "../ui/separator";
import { useAuthActions } from "@convex-dev/auth/react";
import { useRouter } from "next/navigation";

import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { ScrollArea } from "../ui/scroll-area";
import { useEffect, useState } from "react";

interface NavSidebarProps {
  toggleSidebar: () => void;
  categories: Category[] | undefined;
}

function NavSidebar({ toggleSidebar, categories }: NavSidebarProps) {
  const { isAuthenticated } = useConvexAuth();
  const router = useRouter();
  const [{ department }] = useDepartmentAtom();
  const { signOut } = useAuthActions();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <Sheet>
      <SheetTrigger className="cursor-pointer" disabled={!mounted}>
        <Menu size={32}></Menu>
      </SheetTrigger>
      <SheetContent customClose side="left">
        <SheetHeader className="hidden">
          <SheetTitle></SheetTitle>
        </SheetHeader>
        <ScrollArea className="h-full">
          <div className="bg-background">
            {/* Department Selector */}
            <div className="grid grid-cols-2 text-center text-present-3-bold bg-border gap-[1px]">
              <Link
                href={"/mens"}
                className={cn(
                  "border-b py-4 bg-background",
                  department === "Male" && "border-b-[3px] border-b-foreground"
                )}
              >
                Men
              </Link>
              <Link
                href={"/womens"}
                className={cn(
                  "border-b py-4 bg-background",
                  department === "Female" &&
                    "border-b-[3px] border-b-foreground"
                )}
              >
                Women
              </Link>
            </div>

            <div className="px-4 py-6 grid gap-10 grid-rows-[auto_1fr_auto] relative">
              <SheetClose className="cursor-pointer transition hover:text-destructive justify-self-end absolute top-[1rem] right-[1rem]">
                <X size={24}></X>
              </SheetClose>

              {/* Header */}
              <div className="pt-2 text-center space-y-4">
                <h1 className="text-present-2 md:text-present-1 text-primary ">
                  FusionFootwear
                </h1>
                <p className="max-md:text-present-4-bold md:text-present-3-bold">
                  Where <span className="text-primary">Performance</span> Meets{" "}
                  <span className="text-primary">Style</span>.
                </p>
                {isAuthenticated ? (
                  <div className="pt-4">
                    <UserAvatar size={48}></UserAvatar>
                  </div>
                ) : (
                  <Link
                    href={`/auth`}
                    className="text-present-4-bold flex items-center gap-1 justify-self-center transition hover:text-primary"
                  >
                    <span>Sign in</span>
                    <ArrowRight size={16}></ArrowRight>
                  </Link>
                )}
              </div>
              {/* Category Links */}
              <ul className="flex flex-col gap-4">
                <SidebarLink
                  onClick={toggleSidebar}
                  text={"Home"}
                  href={department === "Female" ? "/womens" : "/mens"}
                ></SidebarLink>
                {categories?.map((category) => (
                  <SidebarLink
                    onClick={toggleSidebar}
                    key={category.id}
                    text={category.name}
                    href={`/${department === "Male" ? "mens" : "womens"}/${category.id}`}
                  ></SidebarLink>
                ))}
              </ul>
              {/* Footer */}
              <div className="space-y-6">
                <div className="flex items-center justify-between text-primary text-3xl max-w-[225px] mx-auto">
                  <Link href={"https://www.facebook.com/"} target="_blank">
                    <FaFacebook></FaFacebook>
                  </Link>
                  <Link href={"https://x.com/"} target="_blank">
                    <FaTwitter></FaTwitter>
                  </Link>
                  <Link href={"https://www.instagram.com/"} target="_blank">
                    <FaInstagram></FaInstagram>
                  </Link>
                </div>
                <div className="flex flex-col gap-4">
                  {isAuthenticated ? (
                    <div className="flex items-center gap-4">
                      <h3 className="text-present-3-bold">Hi There!</h3>
                      <button
                        className="text-grey-500 text-present-3 underline transition hover:text-primary-60 cursor-pointer"
                        onClick={() => {
                          signOut();
                          router.refresh();
                        }}
                      >
                        Sign out
                      </button>
                    </div>
                  ) : (
                    <Link
                      href={"/auth"}
                      className="w-fit pl-4 text-present-3 text-grey-500 underline transition hover:text-primary-60"
                    >
                      Sign in | Join
                    </Link>
                  )}
                  <Separator></Separator>
                  <ul>
                    <Link href={"/orders"}>
                      <li className="py-4 transition hover:text-primary-80 pl-4 flex items-center gap-3">
                        <ShoppingBag></ShoppingBag>
                        My Orders
                      </li>
                    </Link>
                    <Link href={"/faq"}>
                      <li className="py-4 transition hover:text-primary-80 pl-4 flex items-center gap-3">
                        <FileQuestion></FileQuestion>
                        FAQs
                      </li>
                    </Link>
                    <Link href={"/about"}>
                      <li className="py-4 transition hover:text-primary-80 pl-4 flex items-center gap-3">
                        <Info></Info>
                        About us
                      </li>
                    </Link>
                    <Link href={"/contact"}>
                      <li className="py-4 transition hover:text-primary-80 pl-4 flex items-center gap-3">
                        <MessageCircle></MessageCircle>
                        Contact Us
                      </li>
                    </Link>
                  </ul>
                  <Separator></Separator>
                </div>
              </div>
            </div>
          </div>
        </ScrollArea>
      </SheetContent>
    </Sheet>
  );
}
export default NavSidebar;
