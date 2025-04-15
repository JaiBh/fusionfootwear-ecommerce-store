"use client";

import { cn } from "@/lib/utils";
import { useConvexAuth } from "convex/react";
import {
  ArrowRight,
  FileQuestion,
  Info,
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

interface NavSidebarProps {
  isOpen: boolean;
  setOpen: () => void;
  categories: Category[] | undefined;
}

function NavSidebar({ isOpen, setOpen, categories }: NavSidebarProps) {
  const { isAuthenticated } = useConvexAuth();
  const [{ department }, setDepartment] = useDepartmentAtom();
  const { signOut } = useAuthActions();

  return (
    <aside
      className={cn(
        `lg:hidden w-[100vw] fixed top-0 left-0 h-full transition grid grid-cols-[minmax(0,_min(80%,_400px))_1fr] overflow-auto z-30`,
        !isOpen && "translate-x-[-100%]"
      )}
    >
      <div className="border-r bg-background">
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
              department === "Female" && "border-b-[3px] border-b-foreground"
            )}
          >
            Women
          </Link>
        </div>

        <div className="px-4 py-6 grid gap-10 grid-rows-[auto_1fr_auto] relative">
          <button
            className="cursor-pointer transition hover:text-destructive justify-self-end absolute top-[1rem] right-[1rem]"
            onClick={setOpen}
          >
            <X size={24}></X>
          </button>

          {/* Header */}
          <div className="pt-2 text-center space-y-4">
            <h1 className="text-present-1 text-primary ">FusionFootwear</h1>
            <p className="text-present-3-bold">
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
              text={"Home"}
              href={department === "Female" ? "/womens" : "/mens"}
            ></SidebarLink>
            {categories?.map((category) => (
              <SidebarLink
                key={category.id}
                text={category.name}
                href={`/${department === "Male" ? "mens" : "womens"}/${category.id}`}
              ></SidebarLink>
            ))}
          </ul>
          {/* Footer */}
          <div className="space-y-6">
            <div className="flex items-center justify-between text-primary text-3xl max-w-[225px] mx-auto">
              <Link href={"https://www.facebook.com/"}>
                <FaFacebook></FaFacebook>
              </Link>
              <Link href={"https://x.com/"}>
                <FaTwitter></FaTwitter>
              </Link>
              <Link href={"https://www.instagram.com/"}>
                <FaInstagram></FaInstagram>
              </Link>
            </div>
            <div className="flex flex-col gap-4">
              {isAuthenticated ? (
                <div className="flex items-center gap-4">
                  <h3 className="text-present-3-bold">Hi There!</h3>
                  <button
                    className="text-grey-500 text-present-3 underline transition hover:text-primary-60 cursor-pointer"
                    onClick={signOut}
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
                <Link href={"/faqs"}>
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
      <div
        className={cn(`bg-[rgba(0,0,0,0.2)]`, !isOpen && "hidden")}
        onClick={setOpen}
      ></div>
    </aside>
  );
}
export default NavSidebar;
