import { trpc } from "@/lib/trpc/client";

export const useProfile = () => {
  return trpc.profiles.get.useQuery();
};
