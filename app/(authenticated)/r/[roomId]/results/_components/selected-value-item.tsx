import { cn } from "@/lib/utils";
import { CardItem } from "../../_components/card-item";
import { usePlayersForSelectedValue } from "../_hooks/use-players-for-selected-value";
import { getBackgroundColor, getTextColor } from "@/app/_util/colors";

export const SelectedValueItem = ({
  selectedValue,
}: {
  selectedValue: number;
}) => {
  const { playersForSelectedValue } = usePlayersForSelectedValue({
    selectedValue,
  });
  return (
    <div className="flex items-center gap-6">
      <CardItem className="border shadow-md">{selectedValue}</CardItem>
      <div className="flex items-center gap-3">
        {playersForSelectedValue.map((player) => (
          <div
            key={player.id}
            className={cn(
              "rounded px-4 py-2 text-sm",
              getBackgroundColor(player.profile.color),
              getTextColor(player.profile.color)
            )}
          >
            {player.profile.name}
          </div>
        ))}
      </div>
    </div>
  );
};
