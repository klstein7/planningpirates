"use client";

import { useEffect } from "react";
import { usePlayers } from "../_hooks/use-players";
import { PlayerItem } from "./player-item";

export const PlayerList = ({ roomId }: { roomId: string }) => {
  const players = usePlayers({ roomId });

  useEffect(() => {}, []);

  return (
    <div className="flex flex-1 items-center justify-center">
      <div className="flex flex-col gap-3">
        <div className="flex items-center justify-center gap-3">
          {players.data?.map((player) => (
            <PlayerItem key={player.id} player={player} />
          ))}
        </div>
        <div className="flex h-[500px] w-[500px] flex-col gap-3 bg-[url('/images/room.png')] bg-contain bg-center" />
      </div>
    </div>
  );
};
