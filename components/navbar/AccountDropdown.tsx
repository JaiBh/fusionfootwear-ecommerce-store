"use client";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useConvexAuth } from "convex/react";
import {
  FileQuestion,
  Info,
  MessageCircle,
  ShoppingBag,
  User,
} from "lucide-react";
import Link from "next/link";
import { useAuthActions } from "@convex-dev/auth/react";

function AccountDropdown() {
  const { isAuthenticated } = useConvexAuth();
  const { signOut } = useAuthActions();

  return (
    <DropdownMenu>
      <DropdownMenuTrigger className="hover:text-primary transition cursor-pointer">
        <User></User>
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        <DropdownMenuLabel className="py-4 px-10">
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
              className="pl-4 text-present-3 underline transition hover:text-primary-60"
            >
              Sign in | Join
            </Link>
          )}
        </DropdownMenuLabel>
        <DropdownMenuSeparator />
        <div className="p-4">
          <DropdownMenuItem className="transition hover:text-primary">
            <Link
              href={"/orders"}
              className="flex items-center gap-4 text-present-3 py-1"
            >
              <ShoppingBag></ShoppingBag>
              My Orders
            </Link>
          </DropdownMenuItem>
          <DropdownMenuItem className="transition hover:text-primary">
            <Link
              href={"/faqs"}
              className="flex items-center gap-4 text-present-3 py-1"
            >
              <FileQuestion></FileQuestion>
              FAQs
            </Link>
          </DropdownMenuItem>
          <DropdownMenuItem className="transition hover:text-primary">
            <Link
              href={"/about"}
              className="flex items-center gap-4 text-present-3 py-1"
            >
              <Info></Info>
              About Us
            </Link>
          </DropdownMenuItem>
          <DropdownMenuItem className="transition hover:text-primary">
            <Link
              href={"/contact"}
              className="flex items-center gap-4 text-present-3 py-1"
            >
              <MessageCircle></MessageCircle>
              Contact Us
            </Link>
          </DropdownMenuItem>
        </div>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
export default AccountDropdown;
