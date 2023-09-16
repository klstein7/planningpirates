"use client";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { HiUser } from "react-icons/hi2";
import { UpdateUserProfileDialog } from "./update-profile-form";
import { useProfile } from "../_hooks/use-profile";
import { PiSignOutDuotone } from "react-icons/pi";
import { signOut } from "next-auth/react";

export const UserDropdownMenu = () => {
  const profile = useProfile();
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          size="icon"
          variant="ghost"
          className="text-primary-foreground bg-background/10"
        >
          <HiUser className="h-5 w-5" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" side="bottom">
        {profile.data && <UpdateUserProfileDialog profile={profile.data} />}
        <DropdownMenuItem
          onClick={async () => {
            await signOut({
              callbackUrl: "/sign-in",
            });
          }}
        >
          <PiSignOutDuotone className="mr-2 h-5 w-5" />
          Sign out
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
