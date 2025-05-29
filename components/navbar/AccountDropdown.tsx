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
import { useAuthActions } from "@convex-dev/auth/react";
import { cn } from "@/lib/utils";
import { useState } from "react";
import RouteLink from "../global/RouteLink";
import { toast } from "sonner";

function AccountDropdown() {
  const { isAuthenticated } = useConvexAuth();
  const { signOut } = useAuthActions();
  const [open, setOpen] = useState(false);

  return (
    <DropdownMenu open={open} onOpenChange={setOpen}>
      <DropdownMenuTrigger className="hover:text-primary transition cursor-pointer">
        <User className={cn(isAuthenticated && "text-primary")}></User>
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        <DropdownMenuLabel className="py-4 px-10">
          {isAuthenticated ? (
            <div className="flex items-center gap-4">
              <h3 className="text-present-3-bold">Hi There!</h3>
              <button
                className="text-grey-500 text-present-3 underline transition hover:text-primary-60 cursor-pointer"
                onClick={() => {
                  signOut();
                  toast.success("You have been signed out");
                }}
              >
                Sign out
              </button>
            </div>
          ) : (
            <RouteLink
              href={"/auth"}
              className="pl-4 text-present-3 underline transition hover:text-primary-60"
              onClick={() => {
                setOpen(false);
              }}
            >
              Sign in | Join
            </RouteLink>
          )}
        </DropdownMenuLabel>
        <DropdownMenuSeparator />
        <div className="p-4">
          <DropdownMenuItem className="transition hover:text-primary">
            <RouteLink
              href={"/orders"}
              className="flex items-center gap-4 text-present-3 py-1 w-full"
              onClick={() => setOpen(false)}
            >
              <ShoppingBag></ShoppingBag>
              My Orders
            </RouteLink>
          </DropdownMenuItem>
          <DropdownMenuItem className="transition hover:text-primary">
            <RouteLink
              href={"/faq"}
              className="flex items-center gap-4 text-present-3 py-1 w-full"
              onClick={() => setOpen(false)}
            >
              <FileQuestion></FileQuestion>
              FAQs
            </RouteLink>
          </DropdownMenuItem>
          <DropdownMenuItem className="transition hover:text-primary">
            <RouteLink
              href={"/about"}
              className="flex items-center gap-4 text-present-3 py-1 w-full"
              onClick={() => setOpen(false)}
            >
              <Info></Info>
              About Us
            </RouteLink>
          </DropdownMenuItem>
          <DropdownMenuItem className="transition hover:text-primary">
            <RouteLink
              href={"/contact"}
              className="flex items-center gap-4 text-present-3 py-1 w-full"
              onClick={() => setOpen(false)}
            >
              <MessageCircle></MessageCircle>
              Contact Us
            </RouteLink>
          </DropdownMenuItem>
        </div>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
export default AccountDropdown;
