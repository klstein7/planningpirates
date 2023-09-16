"use client";

import { Button } from "@/components/ui/button";
import { RiSailboatFill } from "react-icons/ri";
import { useUpdateRoom } from "../../_hooks/use-update-room";
import { useRoomId } from "../../_hooks/use-room-id";
import { useRouter } from "next/navigation";

export const ResultsActions = () => {
  const { roomId } = useRoomId();
  const router = useRouter();
  const updateRoomMutation = useUpdateRoom();
  return (
    <div className="flex items-center gap-3">
      <Button
        loading={updateRoomMutation.isLoading}
        size="lg"
        onClick={async () => {
          await updateRoomMutation.mutateAsync({
            id: roomId,
            status: "voting",
          });
          router.push(`/r/${roomId}`);
        }}
      >
        <RiSailboatFill className="mr-2 h-5 w-5" />
        Re-embark
      </Button>
    </div>
  );
};
