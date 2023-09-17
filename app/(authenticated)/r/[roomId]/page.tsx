import { api } from "@/lib/trpc/api";
import { api as actionsApi } from "@/lib/server/actions";
import { PlayerList } from "./_components/player-list";
import { CardList } from "./_components/card-list";
import { redirect } from "next/navigation";
import { Session, getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";

export const dynamic = "force-dynamic";

export default async function RoomPage({
  params: { roomId },
}: {
  params: {
    roomId: string;
  };
}) {
  const session = (await getServerSession(authOptions)) as Session;

  const players = await actionsApi.players.find({ roomId });

  const room = await api.rooms.get.query({ id: roomId });

  const player = players.find((player) => player.profileId === session.user.id);

  if (!room) {
    redirect("/");
  }

  if (room.status === "revealed") {
    redirect(`/r/${roomId}/results`);
  }

  return (
    <div className="flex flex-1 flex-col gap-3">
      <PlayerList players={players} />
      {player && <CardList player={player} />}
    </div>
  );
}
