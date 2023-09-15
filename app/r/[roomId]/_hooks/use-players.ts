import { trpc } from "@/lib/trpc/client";

export const usePlayers = ({ roomId }: { roomId: string }) => {
  return trpc.players.find.useQuery({ roomId });
};
