import { api } from "@/lib/server/actions";
import { PlayerList } from "./_components/player-list";
import { CardList } from "./_components/card-list";
import { redirect } from "next/navigation";
import { Session, getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { PlayersProvider } from "./_context/players-provider";

export const dynamic = "force-dynamic";

export default async function RoomPage({
  params: { roomId },
}: {
  params: {
    roomId: string;
  };
}) {
  const session = (await getServerSession(authOptions)) as Session;

  const players = await api.players.find({ roomId });

  const room = await api.rooms.get({ id: roomId });

  const player = players.find((player) => player.profileId === session.user.id);

  if (!room) {
    redirect("/");
  }

  if (room.status === "revealed") {
    redirect(`/r/${roomId}/results`);
  }

  return (
    <PlayersProvider players={players}>
      <div className="flex flex-1 flex-col gap-3">
        <PlayerList players={players} />
        <div className="flex items-center justify-center">
          {player && <CardList player={player} />}
        </div>
      </div>
    </PlayersProvider>
  );
}
