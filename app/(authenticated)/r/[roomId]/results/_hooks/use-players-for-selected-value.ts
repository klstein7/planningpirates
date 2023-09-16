import { useMemo } from "react";
import { usePlayers } from "../../_hooks/use-players";

export const usePlayersForSelectedValue = ({
  selectedValue,
}: {
  selectedValue: number;
}) => {
  const players = usePlayers();

  const playersForSelectedValue = useMemo(() => {
    if (!players.data) {
      return [];
    }

    const playersForSelectedValue = players.data.filter(
      (player) => player.selectedValue === selectedValue
    );

    return playersForSelectedValue;
  }, [players.data, selectedValue]);

  return {
    playersForSelectedValue: playersForSelectedValue,
  };
};
