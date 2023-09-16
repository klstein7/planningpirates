import { trpc } from "@/lib/trpc/client";

export const useUpdatePlayer = () => {
  const context = trpc.useContext();

  return trpc.players.update.useMutation();
};
