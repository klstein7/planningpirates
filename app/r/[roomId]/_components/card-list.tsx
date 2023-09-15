"use client";

import { trpc } from "@/lib/trpc/client";
import { usePlayer } from "../_hooks/use-player";
import { CardItem } from "./card-item";
import { useUpdatePlayer } from "../_hooks/use-update-player";
import { cn } from "@/lib/utils";
import { useRoomId } from "../_hooks/use-room-id";
import { getBackgroundColor, getTextColor } from "@/app/_util/colors";

const CARDS = [1, 2, 3, 5, 8, 13, 20, 40, 100];

export const CardList = () => {
  const context = trpc.useContext();

  const { roomId } = useRoomId();
  const { player } = usePlayer();

  const updatePlayerMutation = useUpdatePlayer();

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
            player?.selectedValue === card &&
              getBackgroundColor(player!.profile.color),
            player?.selectedValue === card &&
              getTextColor(player!.profile.color)
          )}
          onClick={async () => {
            const selectedValue = player!.selectedValue === card ? null : card;
            context.players.find.setData({ roomId }, (prev = []) => {
              const p = prev.find((p) => p.id === player!.id);

              if (p) {
                p.selectedValue = selectedValue;
              }

              console.log(p);

              return prev;
            });
            await updatePlayerMutation.mutateAsync({
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
