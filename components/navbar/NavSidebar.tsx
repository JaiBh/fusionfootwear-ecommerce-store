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
import { FaFacebook, FaInstagram, FaTwitter } from "react-icons/fa";
import { Separator } from "../ui/separator";
import { useAuthActions } from "@convex-dev/auth/react";
import { usePathname, useRouter } from "next/navigation";

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
import RouteLink from "../global/RouteLink";
import { toast } from "sonner";

interface NavSidebarProps {
  toggleSidebar: () => void;
  categories: Category[] | undefined;
  department: "Male" | "Female";
}

function NavSidebar({
  toggleSidebar,
  categories,
  department,
}: NavSidebarProps) {
  const { isAuthenticated } = useConvexAuth();
  const router = useRouter();
  const pathname = usePathname();
  const { signOut } = useAuthActions();
  const [open, setOpen] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger
        className="cursor-pointer"
        disabled={!mounted}
        onClick={() => setOpen(true)}
      >
        <Menu size={32}></Menu>
      </SheetTrigger>
      <SheetContent customClose side="left">
        <SheetHeader className="hidden">
          <SheetTitle></SheetTitle>
        </SheetHeader>
        <ScrollArea className="h-full">
          <div className="bg-background">
            {/* Department Selector */}
            <div className="grid grid-cols-2 text-center text-present-3-bold">
              <RouteLink
                href={"/mens"}
                className={cn(
                  "block border-b-[3px] py-4 bg-card opacity-70 transition",
                  department === "Male"
                    ? " border-b-primary text-primary opacity-100"
                    : "hover:border-b-primary-80 hover:text-primary-80"
                )}
                onClick={() => setOpen(false)}
              >
                Men
              </RouteLink>

              <RouteLink
                href={"/womens"}
                className={cn(
                  "block border-b-[3px] py-4 bg-card opacity-70 transition",
                  department === "Female"
                    ? "border-b-primary text-primary opacity-100"
                    : "hover:border-b-primary-80 hover:text-primary-80"
                )}
                onClick={() => setOpen(false)}
              >
                Women
              </RouteLink>
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
                    <UserAvatar></UserAvatar>
                  </div>
                ) : (
                  <RouteLink
                    href={`/auth`}
                    className="text-present-4-bold flex items-center gap-1 justify-self-center transition hover:text-primary"
                    onClick={() => setOpen(false)}
                  >
                    <span>Sign in</span>
                    <ArrowRight size={16}></ArrowRight>
                  </RouteLink>
                )}
              </div>
              {/* Category Links */}
              <ul className="flex flex-col gap-4">
                <SidebarLink
                  onClick={toggleSidebar}
                  text={"Home"}
                  href={department === "Female" ? "/womens" : "/mens"}
                  setOpen={setOpen}
                ></SidebarLink>
                {categories?.map((category) => (
                  <SidebarLink
                    onClick={toggleSidebar}
                    key={category.id}
                    text={category.name}
                    href={`/${department === "Male" ? "mens" : "womens"}/${category.id}`}
                    setOpen={setOpen}
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
                          toast.success("You have been signed out");
                          router.refresh();
                        }}
                      >
                        Sign out
                      </button>
                    </div>
                  ) : (
                    <RouteLink
                      href={`/auth?redirect=${encodeURIComponent(pathname)}`}
                      className="w-fit pl-4 text-present-3 text-grey-500 underline transition hover:text-primary-60"
                    >
                      Sign in | Join
                    </RouteLink>
                  )}
                  <Separator></Separator>
                  <ul>
                    <RouteLink
                      href={"/orders"}
                      onClick={() => setOpen(false)}
                      className="block w-full"
                    >
                      <li className="py-4 transition hover:text-primary-80 pl-4 flex items-center gap-3">
                        <ShoppingBag></ShoppingBag>
                        My Orders
                      </li>
                    </RouteLink>

                    <RouteLink
                      href={"/faq"}
                      onClick={() => setOpen(false)}
                      className="block w-full"
                    >
                      <li className="py-4 transition hover:text-primary-80 pl-4 flex items-center gap-3">
                        <FileQuestion></FileQuestion>
                        FAQs
                      </li>
                    </RouteLink>

                    <RouteLink
                      href={"/about"}
                      onClick={() => setOpen(false)}
                      className="block w-full"
                    >
                      <li className="py-4 transition hover:text-primary-80 pl-4 flex items-center gap-3">
                        <Info></Info>
                        About us
                      </li>
                    </RouteLink>

                    <RouteLink
                      href={"/contact"}
                      onClick={() => setOpen(false)}
                      className="block w-full"
                    >
                      <li className="py-4 transition hover:text-primary-80 pl-4 flex items-center gap-3">
                        <MessageCircle></MessageCircle>
                        Contact Us
                      </li>
                    </RouteLink>
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
