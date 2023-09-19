import { useMemo } from "react";
import { useSelectedValues } from "./use-selected-values";

const getVotesForSelectedValue = (selectedValues: number[], value: number) => {
  return selectedValues.filter((v) => v === value).length;
};

export const useDistinctSelectedValues = () => {
  const { selectedValues } = useSelectedValues();

  const distinctSelectedValues = useMemo(() => {
    return [...new Set(selectedValues)].sort((a, b) => {
      return (
        getVotesForSelectedValue(selectedValues, b) -
        getVotesForSelectedValue(selectedValues, a)
      );
    });
  }, [selectedValues]);

  return {
    distinctSelectedValues: distinctSelectedValues,
  };
};
