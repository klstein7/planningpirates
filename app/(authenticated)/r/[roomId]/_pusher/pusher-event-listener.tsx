"use client";

import { useEffect } from "react";
import { pusher } from ".";
import { API, api } from "@/lib/server/actions";
import { useAuth } from "@clerk/nextjs";

export const PusherEventListener = ({ roomId }: { roomId: string }) => {
  const { userId } = useAuth();

  useEffect(() => {
    const channel = pusher.subscribe(roomId);

    channel.bind("api.players.create", async () => {
      console.log("api.players.create");

      api.rooms.revalidate({ roomId });
    });

    channel.bind(
      "api.players.update",
      async (data: API["players"]["update"]) => {
        console.log("api.players.update", data);

        if (userId === data.profileId) {
          return;
        }

        api.rooms.revalidate({ roomId });
      }
    );

    channel.bind(
      "api.profiles.update",
      async (data: API["players"]["update"]) => {
        console.log("api.profiles.update", data);

        api.rooms.revalidate({ roomId });
      }
    );

    channel.bind("api.rooms.update", async (data: API["rooms"]["update"]) => {
      console.log("api.rooms.update", data);

      api.rooms.revalidate({ roomId });
    });

    return () => {
      channel.unbind();
      pusher.unsubscribe(roomId);
    };
  }, [roomId, userId]);

  return null;
};
