"use client";

import { useEffect } from "react";
import { pusher } from ".";
import { RouterOutput } from "@/lib/trpc/utils";
import { trpc } from "@/lib/trpc/client";
import { useRouter } from "next/navigation";

export const PusherEventListener = ({ roomId }: { roomId: string }) => {
  const context = trpc.useContext();
  const router = useRouter();

  useEffect(() => {
    const channel = pusher.subscribe(roomId);

    channel.bind(
      "api.players.create",
      async (data: RouterOutput["players"]["sync"]) => {
        console.log("api.players.create", data);
        /*
        if (data.id === player.id) {
          return;
        }
        */
        await context.players.find.invalidate({ roomId });
      }
    );

    channel.bind(
      "api.players.update",
      async (data: RouterOutput["players"]["update"]) => {
        console.log("api.players.update", data);

        await context.players.find.invalidate({ roomId });
      }
    );

    channel.bind(
      "api.profiles.update",
      async (data: RouterOutput["players"]["update"]) => {
        console.log("api.profiles.update", data);

        await context.players.find.invalidate({ roomId });
      }
    );

    channel.bind(
      "api.rooms.update",
      async (data: RouterOutput["rooms"]["update"]) => {
        console.log("api.rooms.update", data);

        if (data.status === "revealed") {
          router.push(`/r/${roomId}/results`);
        } else {
          router.push(`/r/${roomId}`);
        }
      }
    );

    return () => {
      channel.unbind();
      pusher.unsubscribe(roomId);
    };
  }, [roomId]);

  return null;
};
