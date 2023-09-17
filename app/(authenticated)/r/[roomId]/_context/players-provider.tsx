"use client";

import { API } from "@/lib/server/actions";
import { PlayersContext } from "./players-context";

export const PlayersProvider = ({
  players,
  children,
}: {
  players: API["players"]["find"];
  children: React.ReactNode;
}) => {
  return (
    <PlayersContext.Provider value={players}>
      {children}
    </PlayersContext.Provider>
  );
};
