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

import { PiSignOutDuotone } from "react-icons/pi";
import { signOut } from "next-auth/react";
import { API } from "@/lib/server/actions";

export const UserDropdownMenu = ({
  profile,
}: {
  profile: API["profiles"]["get"];
}) => {
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
        {profile && <UpdateUserProfileDialog profile={profile} />}
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
