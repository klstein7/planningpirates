"use client";

import { useEffect } from "react";
import { usePlayers } from "../_hooks/use-players";
import { PlayerItem } from "./player-item";
import { RouterOutput } from "@/lib/trpc/utils";
import { Button } from "@/components/ui/button";
import { TbCardsFilled } from "react-icons/tb";
import { useUpdateRoom } from "../_hooks/use-update-room";

export const PlayerList = ({
  roomId,
  initialPlayers,
}: {
  roomId: string;
  initialPlayers: RouterOutput["players"]["find"];
}) => {
  const updateRoomMutation = useUpdateRoom();
  const players = usePlayers({ roomId }, { initialData: initialPlayers });

  return (
    <div className="flex flex-1 items-center justify-center">
      <div className="flex flex-col gap-3">
        <div className="flex items-center justify-center gap-3">
          {players.data?.map((player) => (
            <PlayerItem key={player.id} player={player} />
          ))}
        </div>
        <div className="flex h-[500px] w-[500px] flex-col items-center justify-center gap-3 bg-[url('/images/room.png')] bg-contain bg-center">
          <Button
            loading={updateRoomMutation.isLoading}
            onClick={async () => {
              await updateRoomMutation.mutateAsync({
                id: roomId,
                status: "revealed",
              });
            }}
          >
            <TbCardsFilled className="mr-2 h-5 w-5" />
            Flip &apos;em!
          </Button>
        </div>
      </div>
    </div>
  );
};
