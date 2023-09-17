import { useContext, useMemo } from "react";
import { usePlayers } from "../../_hooks/use-players";
import { SelectedValuesContext } from "../_context/selected-values-context";

export const useSelectedValues = () => {
  const selectedValues = useContext(SelectedValuesContext);

  return {
    selectedValues,
  };
};
