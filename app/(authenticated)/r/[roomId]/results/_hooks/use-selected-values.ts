import { useMemo } from "react";
import { usePlayers } from "../../_hooks/use-players";

export const useSelectedValues = () => {
  const players = usePlayers();

  const selectedValues = useMemo(() => {
    if (!players.data) {
      return [];
    }

    const selectedValues = players.data
      .filter((player) => player.selectedValue)
      .map((player) => player.selectedValue);

    return selectedValues as number[];
  }, [players.data]);

  return {
    selectedValues: selectedValues,
  };
};
