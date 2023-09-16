import { useMemo } from "react";

import { useMedianSelectedValue } from "./use-median-selected-value";
import { useSelectedValues } from "./use-selected-values";
import { getAlignmentPercentage } from "@/lib/utils";

export const useAlignmentPercentage = () => {
  const { selectedValues } = useSelectedValues();

  const alignmentPercentage = useMemo(() => {
    return getAlignmentPercentage(selectedValues);
  }, [selectedValues]);

  return {
    alignmentPercentage,
  };
};
