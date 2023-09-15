import { useMemo } from "react";
import { useRoomId } from "./use-room-id";
import { usePlayers } from "./use-players";
import { useSession } from "next-auth/react";

export const usePlayer = () => {
  const { roomId } = useRoomId();
  const session = useSession();
  const players = usePlayers({ roomId });

  const player = useMemo(() => {
    if (!session.data?.user?.id) {
      return null;
    }

    return players.data?.find(
      (player) => player.profile.id === session.data.user.id
    );
  }, [players.data, session.data]);

  return {
    player,
  };
};
