"use client";

import { useEffect } from "react";
import { pusher } from ".";
import { API, api } from "@/lib/server/actions";
import { useAuth } from "@clerk/nextjs";
import { env } from "process";

export const PusherEventListener = ({ roomId }: { roomId: string }) => {
  const { userId } = useAuth();

  useEffect(() => {
    const channel = pusher.subscribe(roomId);

    channel.bind("api.players.create", async () => {
      if (env.NODE_ENV === "development") {
        console.log("api.players.create");
      }

      api.rooms.revalidate({ roomId });
    });

    channel.bind(
      "api.players.update",
      async (data: API["players"]["update"]) => {
        if (env.NODE_ENV === "development") {
          console.log("api.players.update", data);
        }

        api.rooms.revalidate({ roomId });
      }
    );

    channel.bind(
      "api.profiles.update",
      async (data: API["players"]["update"]) => {
        if (env.NODE_ENV === "development") {
          console.log("api.profiles.update", data);
        }

        api.rooms.revalidate({ roomId });
      }
    );

    channel.bind("api.rooms.update", async (data: API["rooms"]["update"]) => {
      if (env.NODE_ENV === "development") {
        console.log("api.rooms.update", data);
      }

      api.rooms.revalidate({ roomId });
    });

    return () => {
      channel.unbind();
      pusher.unsubscribe(roomId);
    };
  }, [roomId, userId]);

  return null;
};
