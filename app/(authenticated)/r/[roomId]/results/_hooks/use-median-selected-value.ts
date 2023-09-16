import { useMemo } from "react";
import { useSelectedValues } from "./use-selected-values";
import { getMedian } from "@/lib/utils";

export const useMedianSelectedValue = () => {
  const { selectedValues } = useSelectedValues();

  const medianSelectedValue = useMemo(() => {
    return getMedian(selectedValues);
  }, [selectedValues]);

  return {
    medianSelectedValue,
  };
};
