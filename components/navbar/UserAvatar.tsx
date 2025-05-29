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

function UserAvatar({ size }: { size: number }) {
  const user = useGetUser();
  const router = useRouter();
  const { signOut } = useAuthActions();

  if (!user.data?.image) return;
  return (
    <DropdownMenu>
      <DropdownMenuTrigger className="cursor-pointer">
        <Image
          src={user.data?.image}
          alt={"User Avatar"}
          width={size}
          height={size}
          className="object-cover rounded-[50%]"
        ></Image>
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        <DropdownMenuItem
          onClick={() => {
            signOut();
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
