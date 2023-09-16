import { trpc } from "@/lib/trpc/client";

export const useUpdateRoom = () => {
  return trpc.rooms.update.useMutation();
};
