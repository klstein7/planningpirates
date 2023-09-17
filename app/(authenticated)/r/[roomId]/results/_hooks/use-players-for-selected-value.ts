import { useMemo } from "react";
import { usePlayers } from "../../_hooks/use-players";

export const usePlayersForSelectedValue = ({
  selectedValue,
}: {
  selectedValue: number;
}) => {
  const { players } = usePlayers();

  const playersForSelectedValue = useMemo(() => {
    const playersForSelectedValue = players.filter(
      (player) => player.selectedValue === selectedValue
    );

    return playersForSelectedValue;
  }, [players, selectedValue]);

  return {
    playersForSelectedValue: playersForSelectedValue,
  };
};
