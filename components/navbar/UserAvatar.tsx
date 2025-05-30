"use client";

import { useGetUser } from "@/features/auth/api/useGetUser";
import Image from "next/image";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";
import { useAuthActions } from "@convex-dev/auth/react";
import { useRouter } from "next/navigation";
import { cn } from "@/lib/utils";
import { toast } from "sonner";

function UserAvatar() {
  const { data: user, isLoading } = useGetUser();
  const router = useRouter();
  const { signOut } = useAuthActions();

  if (isLoading) return;

  if (!user) return;

  return (
    <DropdownMenu>
      <DropdownMenuTrigger className="cursor-pointer">
        {user.image ? (
          <Image
            src={user.image}
            alt={"User Avatar"}
            width={48}
            height={48}
            className="object-cover rounded-[50%]"
          ></Image>
        ) : (
          <div
            className={cn(
              `size-[48px] rounded-[50%] flex items-center justify-center bg-primary-60 font-bold`
            )}
          >
            {user.email?.charAt(0).toUpperCase()}
          </div>
        )}
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        <DropdownMenuItem
          className="cursor-pointer hover:bg-secondary hover:text-primary transition"
          onClick={() => {
            signOut();
            toast.success("You have been signed out");
            router.refresh();
          }}
        >
          Sign out
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
export default UserAvatar;
