import { useMemo } from "react";
import { usePlayers } from "../../_hooks/use-players";
import { useRoomId } from "../../_hooks/use-room-id";

export const usePlayersForSelectedValue = ({
  selectedValue,
}: {
  selectedValue: number;
}) => {
  const { roomId } = useRoomId();
  const players = usePlayers({ roomId });

  const playersForSelectedValue = useMemo(() => {
    if (!players.data) {
      return;
    }

    const playersForSelectedValue = players.data.filter(
      (player) => player.selectedValue === selectedValue
    );

    return playersForSelectedValue;
  }, [players.data, selectedValue]);

  return {
    playersForSelectedValue: playersForSelectedValue || [],
  };
};
