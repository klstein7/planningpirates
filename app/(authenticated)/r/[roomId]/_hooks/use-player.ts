import { useMemo } from "react";
import { usePlayers } from "./use-players";
import { useAuth } from "@clerk/nextjs";

export const usePlayer = () => {
  const { userId } = useAuth();
  const { players } = usePlayers();

  const player = useMemo(() => {
    if (!userId) {
      return null;
    }

    return players.find((player) => player.profile.id === userId);
  }, [players, userId]);

  return {
    player,
  };
};
