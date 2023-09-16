import { useMemo } from "react";

import { useMedianSelectedValue } from "./use-median-selected-value";
import { useSelectedValues } from "./use-selected-values";

export const useAlignmentPercentage = () => {
  const { medianSelectedValue } = useMedianSelectedValue();
  const { selectedValues } = useSelectedValues();

  const alignmentPercentage = useMemo(() => {
    if (!selectedValues || selectedValues.length === 0) {
      return null;
    }

    if (medianSelectedValue === null) {
      return 0;
    }

    const tolerance = 1;
    const alignedValuesCount = selectedValues.filter(
      (value) => Math.abs(value - medianSelectedValue) <= tolerance
    ).length;
    const totalValues = selectedValues.length;
    const percentage = (alignedValuesCount / totalValues) * 100;

    return percentage % 1 === 0
      ? percentage
      : parseFloat(percentage.toFixed(2));
  }, [selectedValues, medianSelectedValue]);

  return {
    alignmentPercentage,
  };
};
