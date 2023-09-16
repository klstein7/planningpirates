import { trpc } from "@/lib/trpc/client";
import { RouterOutput } from "@/lib/trpc/utils";

export const usePlayers = (
  { roomId }: { roomId: string },
  opts?: {
    initialData?: RouterOutput["players"]["find"];
  }
) => {
  return trpc.players.find.useQuery(
    { roomId },
    {
      initialData: opts?.initialData,
    }
  );
};
