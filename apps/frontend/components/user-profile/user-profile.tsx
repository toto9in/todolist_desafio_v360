"use client";

import { useSession, signOut } from "next-auth/react";
import { Button } from "../ui/button";
import Image from "next/image";
import { DropdownMenu } from "@radix-ui/react-dropdown-menu";
import {
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";
import { LogOut } from "lucide-react";

export const UserProfile = () => {
  const { data: session } = useSession();

  const imageUrl = session?.user?.image;
  const userName = session?.user?.name;

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="ghost"
          className="w-full justify-start items-center gap-2 pl-0 hover:bg-purple-100 hover:text-purple-700"
        >
          {imageUrl && (
            <Image
              className="rounded-full"
              src={session?.user?.image ?? "/default-profile.png"}
              height={28}
              width={28}
              alt="picture"
            />
          )}
          <span className="font-semibold">{userName}</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56">
        <DropdownMenuLabel>My Account</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuItem>
          <Button
            variant="ghost"
            className="w-full flex justify-start hover:bg-purple-100 hover:text-purple-700"
            onClick={() => signOut({ callbackUrl: "/" })}
          >
            <LogOut />
            <span>Sign Out</span>
          </Button>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
