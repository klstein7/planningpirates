"use client";

import { Button } from "@/components/ui/button";
import { RiSailboatFill } from "react-icons/ri";
import { useRoomId } from "../../_hooks/use-room-id";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { api } from "@/lib/server/actions";
import { useIsHost } from "../../_hooks/use-is-host";

export const ResetRoomButton = () => {
  const router = useRouter();

  const [loading, setLoading] = useState(false);

  const { roomId } = useRoomId();
  const { isHost } = useIsHost();

  if (!isHost) {
    return null;
  }

  return (
    <div className="flex items-center gap-3">
      <Button
        loading={loading}
        size="lg"
        onClick={async () => {
          setLoading(true);
          await api.rooms.update({
            id: roomId,
            status: "voting",
          });
          setLoading(false);
          router.push(`/r/${roomId}`);
        }}
      >
        <RiSailboatFill className="mr-2 h-5 w-5" />
        Re-embark
      </Button>
    </div>
  );
};
