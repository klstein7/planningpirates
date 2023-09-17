import { Separator } from "@/components/ui/separator";
import { SelectedValueList } from "./_components/selected-value-list";
import { SelectedValueStats } from "./_components/selected-value-stats";
import { ResultsConfetti } from "./_components/results-confetti";
import { StatusMessage } from "./_components/status-message";
import { ResultsActions } from "./_components/results-actions";

import { redirect } from "next/navigation";
import { api } from "@/lib/server/actions";
import { SelectedValueProvider } from "./_context/selected-values-provider";
import { PlayersProvider } from "../_context/players-provider";

export const dynamic = "force-dynamic";

export default async function ResultsPage({
  params: { roomId },
}: {
  params: {
    roomId: string;
  };
}) {
  const room = await api.rooms.get({ id: roomId });

  const players = await api.players.find({ roomId });

  const selectedValues = players
    .filter((player) => player.selectedValue !== null)
    .map((player) => player.selectedValue) as number[];

  if (!room) {
    redirect("/");
  }

  if (room.status !== "revealed") {
    redirect(`/r/${roomId}`);
  }

  return (
    <PlayersProvider players={players}>
      <SelectedValueProvider selectedValues={selectedValues}>
        <div className="flex w-full flex-1 items-center justify-center">
          <div className="bg-background flex w-full max-w-2xl flex-col items-center gap-3 rounded p-6">
            <h1 className="text-3xl font-bold">Crew&apos;s Outcome</h1>
            <Separator />
            <SelectedValueList />
            <Separator />
            <SelectedValueStats />
            <Separator />
            <StatusMessage />
            <Separator />
            <ResultsActions />
          </div>
        </div>
        <ResultsConfetti />
      </SelectedValueProvider>
    </PlayersProvider>
  );
}
