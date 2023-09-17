import { PlayerItem } from "./player-item";
import { API } from "@/lib/server/actions";

import { RevealCardsButton } from "./reveal-cards-button";

export const PlayerList = async ({
  players,
}: {
  players: API["players"]["find"];
}) => {
  return (
    <div className="flex flex-1 items-center justify-center">
      <div className="flex flex-col gap-3">
        <div className="flex items-center justify-center gap-3">
          {players.map((player) => (
            <PlayerItem key={player.id} player={player} />
          ))}
        </div>
        <div className="flex h-[500px] w-[500px] flex-col items-center justify-center gap-3 bg-[url('/images/room.png')] bg-contain bg-center">
          <RevealCardsButton />
        </div>
      </div>
    </div>
  );
};
