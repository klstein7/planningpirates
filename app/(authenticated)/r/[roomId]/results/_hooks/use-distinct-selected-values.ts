import { useMemo } from "react";
import { usePlayers } from "../../_hooks/use-players";
import { useRoomId } from "../../_hooks/use-room-id";

export const useDistinctSelectedValues = () => {
  const players = usePlayers();

  const distinctSelectedValues = useMemo(() => {
    if (!players.data) {
      return [];
    }

    const selectedValues = players.data
      .filter((player) => player.selectedValue)
      .map((player) => player.selectedValue);

    const distinctSelectedValues = [...new Set(selectedValues)];

    return distinctSelectedValues as number[];
  }, [players.data]);

  return {
    distinctSelectedValues: distinctSelectedValues,
  };
};
