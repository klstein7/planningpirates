import { api } from "@/lib/trpc/api";
import { PlayerList } from "./_components/player-list";
import { CardList } from "./_components/card-list";
import { UserDropdownMenu } from "@/app/(authenticated)/_components/user-dropdown-menu";
import { PusherEventListener } from "./_pusher/pusher-event-listener";
import { redirect } from "next/navigation";

export const dynamic = "force-dynamic";

export default async function RoomPage({
  params: { roomId },
}: {
  params: {
    roomId: string;
  };
}) {
  await api.players.sync.mutate({ roomId });

  const initialPlayers = await api.players.find.query({ roomId });

  const room = await api.rooms.get.query({ id: roomId });

  if (!room) {
    redirect("/");
  }

  if (room.status === "revealed") {
    redirect(`/r/${roomId}/results`);
  }

  return (
    <div className="flex flex-1 flex-col gap-3">
      <PlayerList roomId={roomId} initialPlayers={initialPlayers} />
      <CardList />
    </div>
  );
}
