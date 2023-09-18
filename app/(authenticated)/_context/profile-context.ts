import { API } from "@/lib/server/actions";
import { createContext } from "react";

type ProfileContextType = API["profiles"]["get"];

export const ProfileContext = createContext<ProfileContextType>(
  {} as ProfileContextType
);
