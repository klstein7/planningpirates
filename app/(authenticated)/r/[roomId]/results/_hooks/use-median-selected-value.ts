import { useMemo } from "react";
import { useSelectedValues } from "./use-selected-values";

export const useMedianSelectedValue = () => {
  const { selectedValues } = useSelectedValues();

  const medianSelectedValue = useMemo(() => {
    if (!selectedValues || selectedValues.length === 0) {
      return null;
    }

    const sortedSelectedValues = [...selectedValues].sort((a, b) => a - b);
    const n = sortedSelectedValues.length;
    let median;

    if (n % 2 === 1) {
      median = sortedSelectedValues[Math.floor(n / 2)];
    } else {
      const middle1 = sortedSelectedValues[Math.floor(n / 2) - 1];
      const middle2 = sortedSelectedValues[Math.floor(n / 2)];
      median = (middle1 + middle2) / 2;
    }

    return isNaN(median) ? null : parseFloat(median.toFixed(1));
  }, [selectedValues]);

  return {
    medianSelectedValue,
  };
};
