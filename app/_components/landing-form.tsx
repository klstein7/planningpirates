"use client";

import { Button } from "@/components/ui/button";
import { api } from "@/lib/server/actions";
import { useRouter } from "next/navigation";
import { useState } from "react";

export const LandingForm = () => {
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  return (
    <div className="flex w-full flex-col gap-3">
      <Button
        loading={loading}
        onClick={async () => {
          setLoading(true);
          const room = await api.rooms.create();
          setLoading(false);
          router.push(`/r/${room.id}`);
        }}
      >
        Create room
      </Button>
    </div>
  );
};
