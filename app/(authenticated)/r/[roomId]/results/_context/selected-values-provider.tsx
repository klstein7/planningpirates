"use client";

import { SelectedValuesContext } from "./selected-values-context";

export const SelectedValueProvider = ({
  selectedValues,
  children,
}: {
  selectedValues: number[];
  children: React.ReactNode;
}) => {
  return (
    <SelectedValuesContext.Provider value={selectedValues}>
      {children}
    </SelectedValuesContext.Provider>
  );
};
