import { useMemo } from "react";
import { useSelectedValues } from "./use-selected-values";

export const useDistinctSelectedValues = () => {
  const { selectedValues } = useSelectedValues();

  const distinctSelectedValues = useMemo(() => {
    return [...new Set(selectedValues)];
  }, [selectedValues]);

  return {
    distinctSelectedValues: distinctSelectedValues,
  };
};
