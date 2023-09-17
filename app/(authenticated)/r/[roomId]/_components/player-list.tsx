import { PlayerItem } from "./player-item";
import { Button } from "@/components/ui/button";
import { API, api } from "@/lib/server/actions";
import { TbCardsFilled } from "react-icons/tb";

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
          <Button>
            <TbCardsFilled className="mr-2 h-5 w-5" />
            Flip &apos;em!
          </Button>
        </div>
      </div>
    </div>
  );
};

/*
            loading={updateRoomMutation.isLoading}
            onClick={async () => {
              await updateRoomMutation.mutateAsync({
                id: roomId,
                status: "revealed",
              });
            }}
*/
