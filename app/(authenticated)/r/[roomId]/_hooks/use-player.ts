import { useMemo } from "react";
import { usePlayers } from "./use-players";
import { useSession } from "next-auth/react";

export const usePlayer = () => {
  const session = useSession();
  const { players } = usePlayers();

  const player = useMemo(() => {
    if (!session.data?.user?.id) {
      return null;
    }

    return players.find((player) => player.profile.id === session.data.user.id);
  }, [players, session.data]);

  return {
    player,
  };
};
