import { trpc } from "@/lib/trpc/client";

export const useUpdateProfile = () => {
  return trpc.profiles.update.useMutation();
};
