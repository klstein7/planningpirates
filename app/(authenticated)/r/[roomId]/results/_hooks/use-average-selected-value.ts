import { useMemo } from "react";
import { usePlayers } from "../../_hooks/use-players";
import { useSelectedValues } from "./use-selected-values";
import { getAverage } from "@/lib/utils";

export const useAverageSelectedValue = () => {
  const { selectedValues } = useSelectedValues();

  const averageSelectedValue = useMemo(() => {
    return getAverage(selectedValues);
  }, [selectedValues]);

  return {
    averageSelectedValue: averageSelectedValue,
  };
};
