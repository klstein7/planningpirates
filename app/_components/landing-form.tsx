"use client";

import { Button } from "@/components/ui/button";
import { trpc } from "@/lib/trpc/client";
import { useRouter } from "next/navigation";

export const LandingForm = () => {
  const router = useRouter();
  const createRoomMutation = trpc.rooms.create.useMutation();
  return (
    <div className="flex w-full flex-col gap-3">
      <Button
        loading={createRoomMutation.isLoading}
        onClick={async () => {
          const room = await createRoomMutation.mutateAsync();
          router.push(`/r/${room.id}`);
        }}
      >
        Create room
      </Button>
    </div>
  );
};
