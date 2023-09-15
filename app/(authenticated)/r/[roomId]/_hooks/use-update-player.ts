import { trpc } from "@/lib/trpc/client";

export const useUpdatePlayer = () => {
  const context = trpc.useContext();

  return trpc.players.update.useMutation({
    onSuccess: async ({ roomId }) => {
      const resp = await context.players.find.invalidate({ roomId });
    },
  });
};
