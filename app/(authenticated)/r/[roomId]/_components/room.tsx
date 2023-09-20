import { API } from "@/lib/server/actions";
import { PlayerItem } from "./player-item";
import { RevealCardsButton } from "./reveal-cards-button";
import { ComponentPropsWithoutRef, forwardRef } from "react";
import { cn } from "@/lib/utils";
import { PlayerDropdownMenu } from "./player-dropdown-menu";

type Props = {
  players: API["players"]["find"];
  size?: "normal" | "compact";
} & ComponentPropsWithoutRef<"div">;

export const Room = forwardRef<HTMLDivElement, Props>(
  ({ players, className, size = "normal", ...props }, ref) => {
    const hasAtLeastOneSelectedValue = players.some(
      (player) => player.selectedValue !== null
    );

    if (size === "compact") {
      return (
        <div
          className={cn("flex flex-col items-center gap-3", className)}
          ref={ref}
          {...props}
        >
          <div className="flex flex-wrap gap-3">
            {players.map((player) => (
              <PlayerDropdownMenu key={player.id} player={player} />
            ))}
          </div>
          <RevealCardsButton disabled={!hasAtLeastOneSelectedValue} />
        </div>
      );
    }

    return (
      <div className={cn("flex-col gap-3", className)} ref={ref} {...props}>
        <div className="flex flex-wrap items-center justify-center gap-3">
          {players
            .filter((_, index) => index % 4 === 0 || index % 4 === 3)
            .map((player) => (
              <PlayerDropdownMenu key={player.id} player={player} />
            ))}
        </div>
        <div className="flex gap-3">
          <div className="flex w-24 flex-col flex-wrap items-center justify-center gap-3">
            {players
              .filter((_, index) => index % 4 === 2)
              .map((player) => (
                <PlayerDropdownMenu key={player.id} player={player} />
              ))}
          </div>
          <div className="flex h-[500px] w-[500px] flex-col items-center justify-center gap-3 bg-[url('/images/room.png')] bg-contain bg-center">
            <RevealCardsButton disabled={!hasAtLeastOneSelectedValue} />
          </div>
          <div className="flex w-24 flex-col flex-wrap items-center justify-center gap-3">
            {players
              .filter((_, index) => index % 4 === 1)
              .map((player) => (
                <PlayerDropdownMenu key={player.id} player={player} />
              ))}
          </div>
        </div>
      </div>
    );
  }
);

Room.displayName = "Room";
