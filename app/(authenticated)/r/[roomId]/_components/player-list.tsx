import { API } from "@/lib/server/actions";
import { Room } from "./room";

export const PlayerList = async ({
  players,
}: {
  players: API["players"]["find"];
}) => {
  return (
    <div className="flex flex-1 items-center justify-center">
      <Room className="hidden md:flex" players={players} size="normal" />
      <Room className="flex md:hidden" players={players} size="compact" />
    </div>
  );
};
