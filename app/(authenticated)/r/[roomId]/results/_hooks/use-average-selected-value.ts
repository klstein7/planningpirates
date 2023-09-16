import { useMemo } from "react";
import { usePlayers } from "../../_hooks/use-players";
import { useSelectedValues } from "./use-selected-values";

export const useAverageSelectedValue = () => {
  const { selectedValues } = useSelectedValues();

  const averageSelectedValue = useMemo(() => {
    if (selectedValues.length === 0) {
      return null;
    }

    const sum = selectedValues.reduce((a, b) => a + b, 0);
    const average = sum / selectedValues.length;

    return parseFloat(average.toFixed(1));
  }, [selectedValues]);

  return {
    averageSelectedValue: averageSelectedValue,
  };
};
