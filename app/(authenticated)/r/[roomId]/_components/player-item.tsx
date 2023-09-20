"use client";

import { getBackgroundColor, getTextColor } from "@/app/_util/colors";

import { cn } from "@/lib/utils";
import Image from "next/image";
import { PiCrownSimpleDuotone } from "react-icons/pi";
import { API } from "@/lib/server/actions";
import { ComponentPropsWithoutRef, forwardRef } from "react";
import { useAuth } from "@clerk/nextjs";
import { usePlayer } from "../_hooks/use-player";

type Props = {
  player: API["players"]["find"][number];
} & ComponentPropsWithoutRef<"div">;

export const PlayerItem = forwardRef<HTMLDivElement, Props>(
  ({ player, className, ...props }, ref) => {
    const { player: currentPlayer } = usePlayer();
    return (
      <div
        ref={ref}
        className={cn(
          "border-border/20 pointer-events-none flex w-20 cursor-pointer select-none flex-col items-center gap-3 rounded-sm border bg-black/20 p-3 backdrop-blur-md hover:bg-white/5 md:w-24",
          {
            "pointer-events-auto":
              player.role !== "host" && currentPlayer?.role === "host",
          },
          className
        )}
        {...props}
      >
        <div
          className={cn(
            "border-border/20 flex h-12 w-8 items-center justify-center rounded border md:h-16 md:w-10",
            player.selectedValue !== null &&
              getBackgroundColor(player.profile.color)
          )}
        />
        <Image
          src={player.profile.avatarUrl}
          width={96}
          height={96}
          alt="user avatar"
        />
        <div
          className={cn(
            "flex w-12 flex-col items-center justify-center gap-1 text-xs font-medium",
            getTextColor(player.profile.color)
          )}
        >
          {player.role === "host" && (
            <PiCrownSimpleDuotone className="h-4 w-4" />
          )}
          <span className="truncate">{player.profile.name}</span>
        </div>
      </div>
    );
  }
);

PlayerItem.displayName = "PlayerItem";
