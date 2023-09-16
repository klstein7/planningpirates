"use client";

import { Confetti } from "@/components/ui/confetti";
import { useAlignmentPercentage } from "../_hooks/use-alignment-percentage";

export const ResultsConfetti = () => {
  const { alignmentPercentage } = useAlignmentPercentage();

  if (alignmentPercentage === 100) {
    return <Confetti />;
  }

  return null;
};
