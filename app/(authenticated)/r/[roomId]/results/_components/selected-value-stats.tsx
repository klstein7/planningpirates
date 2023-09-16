"use client";

import { Skeleton } from "@/components/ui/skeleton";
import { useAverageSelectedValue } from "../_hooks/use-average-selected-value";
import { useMedianSelectedValue } from "../_hooks/use-median-selected-value";
import { useAlignmentPercentage } from "../_hooks/use-alignment-percentage";

const StatsItem = ({
  label,
  value,
  isPercentage,
}: {
  label: string;
  value: number | null;
  isPercentage?: boolean;
}) => {
  if (value === null) {
    return <Skeleton className="h-24" />;
  }
  return (
    <div className="bg-secondary flex h-24 flex-col items-center justify-center gap-1 rounded">
      <div className="text-muted-foreground text-xs">{label}</div>
      <div className="flex items-end gap-0.5">
        <div className="text-4xl font-bold">{value}</div>
        {isPercentage && <div className="text-muted-foreground text-lg">%</div>}
      </div>
    </div>
  );
};

export const SelectedValueStats = () => {
  const { averageSelectedValue } = useAverageSelectedValue();
  const { medianSelectedValue } = useMedianSelectedValue();
  const { alignmentPercentage } = useAlignmentPercentage();
  return (
    <div className="grid w-full grid-cols-3 gap-3">
      <StatsItem label="Average" value={averageSelectedValue} />
      <StatsItem label="Median" value={medianSelectedValue} />
      <StatsItem label="Alignment" value={alignmentPercentage} isPercentage />
    </div>
  );
};
