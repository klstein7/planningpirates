import { api } from "@/lib/trpc/api";
import { PlayerList } from "./_components/player-list";
import { CardList } from "./_components/card-list";
import { Button } from "@/components/ui/button";
import { HiUser } from "react-icons/hi2";
import { UserDropdownMenu } from "@/app/_components/user-dropdown-menu";

export const dynamic = "force-dynamic";
export const revalidate = 0;

export default async function RoomPage({
  params: { roomId },
}: {
  params: {
    roomId: string;
  };
}) {
  await api.players.sync.mutate({ roomId });

  return (
    <div className="flex h-full w-full bg-[url('/images/floor.png')] bg-center">
      <div className="flex h-full w-full flex-col items-center gap-3 backdrop-blur-sm">
        <div className="flex w-full justify-end p-3">
          <UserDropdownMenu />
        </div>
        <PlayerList roomId={roomId} />
        <CardList />
      </div>
    </div>
  );
}
