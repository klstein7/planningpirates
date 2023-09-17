"use client";

import { Button } from "@/components/ui/button";
import { TbCardsFilled } from "react-icons/tb";
import { useRoomId } from "../_hooks/use-room-id";
import { api } from "@/lib/server/actions";
import { useState } from "react";

export const RevealCardsButton = () => {
  const [loading, setLoading] = useState(false);
  const { roomId } = useRoomId();
  return (
    <Button
      loading={loading}
      onClick={async () => {
        setLoading(true);
        await api.rooms.update({
          id: roomId,
          status: "revealed",
        });
        setLoading(false);
      }}
    >
      <TbCardsFilled className="mr-2 h-5 w-5" />
      Flip &apos;em!
    </Button>
  );
};
