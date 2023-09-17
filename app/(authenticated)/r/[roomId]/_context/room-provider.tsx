"use client";

import { API } from "@/lib/server/actions";
import { RoomContext } from "./room-context";

export const RoomProvider = ({
  room,
  children,
}: {
  room: NonNullable<API["rooms"]["get"]>;
  children: React.ReactNode;
}) => {
  return <RoomContext.Provider value={room}>{children}</RoomContext.Provider>;
};
