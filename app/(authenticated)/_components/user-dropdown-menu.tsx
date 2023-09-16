"use client";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { HiUser } from "react-icons/hi2";
import { UpdateUserProfileDialog } from "./update-profile-form";
import { useProfile } from "../_hooks/use-profile";

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
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
