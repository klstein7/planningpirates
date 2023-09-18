"use client";

import { API, api } from "@/lib/server/actions";
import { ProfileContext } from "./profile-context";
import { Spinner } from "@/components/ui/spinner";
import { useEffect } from "react";

export const ProfileProvider = ({
  children,
  profile,
}: {
  children: React.ReactNode;
  profile: API["profiles"]["get"];
}) => {
  useEffect(() => {
    if (!profile) {
      api.profiles.sync();
    }
  }, [profile]);

  if (!profile)
    return (
      <div className="flex h-full w-full items-center justify-center">
        <Spinner className="text-primary-foreground h-8 w-8" />
      </div>
    );

  return (
    <ProfileContext.Provider value={profile}>
      {children}
    </ProfileContext.Provider>
  );
};
