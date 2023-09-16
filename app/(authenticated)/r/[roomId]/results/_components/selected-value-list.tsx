"use client";

import { useDistinctSelectedValues } from "../_hooks/use-distinct-selected-values";
import { SelectedValueItem } from "./selected-value-item";

export const SelectedValueList = () => {
  const { distinctSelectedValues } = useDistinctSelectedValues();

  return (
    <div className="flex w-full flex-col gap-3">
      {distinctSelectedValues.map((value) => (
        <SelectedValueItem key={value} selectedValue={value} />
      ))}
    </div>
  );
};
