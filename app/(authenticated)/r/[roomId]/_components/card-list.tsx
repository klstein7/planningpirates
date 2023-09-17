"use client";

import { usePlayer } from "../_hooks/use-player";
import { CardItem } from "./card-item";
import { cn } from "@/lib/utils";
import { getBackgroundColor, getTextColor } from "@/app/_util/colors";
import { API, api } from "@/lib/server/actions";
import { experimental_useOptimistic as useOptimistic } from "react";

const CARDS = [1, 2, 3, 5, 8, 13, 20, 40, 100];

export const CardList = ({
  player: initialPlayer,
}: {
  player: API["players"]["find"][number];
}) => {
  const [player, update] = useOptimistic(
    initialPlayer,
    (
      state: API["players"]["find"][number],
      updated: Partial<API["players"]["find"][number]>
    ) => {
      return {
        ...state,
        ...updated,
      };
    }
  );
  return (
    <div
      className={cn("bg-background/10 flex gap-3 rounded-t-lg p-3", {
        "select-none opacity-50": !player,
      })}
    >
      {CARDS.map((card) => (
        <CardItem
          key={`card-${card}`}
          className={cn(
            player.selectedValue === card &&
              getBackgroundColor(player!.profile.color),
            player.selectedValue === card && getTextColor(player!.profile.color)
          )}
          onClick={async () => {
            const selectedValue = player!.selectedValue === card ? null : card;
            update({
              selectedValue,
            });
            await api.players.update({
              id: player!.id,
              selectedValue,
            });
          }}
        >
          {card}
        </CardItem>
      ))}
    </div>
  );
};
