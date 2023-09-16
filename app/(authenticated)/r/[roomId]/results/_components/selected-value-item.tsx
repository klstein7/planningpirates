import { cn } from "@/lib/utils";
import { CardItem } from "../../_components/card-item";

import { getBackgroundColor, getTextColor } from "@/app/_util/colors";
import { usePlayersForSelectedValue } from "../_hooks/use-players-for-selected-value";
import { usePercentageOfSelectedValue } from "../_hooks/use-percentage-of-selected-value";

export const SelectedValueItem = ({
  selectedValue,
}: {
  selectedValue: number;
}) => {
  const { playersForSelectedValue } = usePlayersForSelectedValue({
    selectedValue,
  });
  const { percentageOfSelectedValue } = usePercentageOfSelectedValue({
    selectedValue,
  });
  return (
    <div className="flex flex-col rounded-t border">
      <div className="flex items-center gap-6 p-3">
        <CardItem className="border shadow-md">{selectedValue}</CardItem>
        <div className="flex flex-1 items-center gap-3">
          {playersForSelectedValue.map((player) => (
            <div
              key={player.id}
              className={cn(
                "flex flex-col items-center rounded px-4 py-2 text-sm",
                getBackgroundColor(player.profile.color),
                getTextColor(player.profile.color)
              )}
            >
              {player.profile.name}
            </div>
          ))}
        </div>
        <div className="text-muted-foreground/50 self-start text-xs">
          {percentageOfSelectedValue}%
        </div>
      </div>
      <div
        className="bg-primary h-2 w-full"
        style={{
          maxWidth: `${percentageOfSelectedValue}%`,
        }}
      />
    </div>
  );
};
