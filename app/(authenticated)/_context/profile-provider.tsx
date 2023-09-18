"use client";

import { API } from "@/lib/server/actions";
import { ProfileContext } from "./profile-context";

export const ProfileProvider = ({
  children,
  profile,
}: {
  children: React.ReactNode;
  profile: API["profiles"]["get"];
}) => {
  console.log(profile);
  return (
    <ProfileContext.Provider value={profile}>
      {children}
    </ProfileContext.Provider>
  );
};
