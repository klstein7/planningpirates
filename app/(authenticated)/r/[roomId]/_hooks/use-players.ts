import { trpc } from "@/lib/trpc/client";
import { RouterOutput } from "@/lib/trpc/utils";
import { useRoomId } from "./use-room-id";

export const usePlayers = (opts?: {
  initialData?: RouterOutput["players"]["find"];
}) => {
  const { roomId } = useRoomId();
  return trpc.players.find.useQuery(
    { roomId },
    {
      initialData: opts?.initialData,
    }
  );
};
