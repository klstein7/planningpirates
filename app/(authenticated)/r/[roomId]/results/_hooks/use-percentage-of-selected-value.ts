import { useMemo } from "react";
import { useSelectedValues } from "./use-selected-values";

export const usePercentageOfSelectedValue = ({
  selectedValue,
}: {
  selectedValue: number;
}) => {
  const { selectedValues } = useSelectedValues();

  const percentageOfSelectedValue = useMemo(() => {
    if (!selectedValues || selectedValues.length === 0) {
      return null;
    }

    const count = selectedValues.filter(
      (value) => value === selectedValue
    ).length;
    const percentage = (count / selectedValues.length) * 100;

    return parseFloat(percentage.toFixed(1));
  }, [selectedValues, selectedValue]);

  return {
    percentageOfSelectedValue,
  };
};
