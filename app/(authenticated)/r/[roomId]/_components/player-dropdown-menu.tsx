"use client";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { API, api } from "@/lib/server/actions";
import { PlayerItem } from "./player-item";
import { PiCrownSimpleDuotone } from "react-icons/pi";
import { useRoomId } from "../_hooks/use-room-id";

export const PlayerDropdownMenu = ({
  player,
}: {
  player: API["players"]["find"][number];
}) => {
  const { roomId } = useRoomId();
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <PlayerItem player={player} />
      </DropdownMenuTrigger>
      <DropdownMenuContent sideOffset={7}>
        <DropdownMenuItem
          onClick={async () => {
            await api.players.update({
              id: player.id,
              role: "host",
              roomId,
            });
          }}
        >
          <PiCrownSimpleDuotone className="mr-2 h-4 w-4" />
          Make &apos;em captain!
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
