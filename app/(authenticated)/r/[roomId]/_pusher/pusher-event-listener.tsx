"use client";

import { useEffect } from "react";
import { pusher } from ".";
import { RouterOutput } from "@/lib/trpc/utils";
import { API, api } from "@/lib/server/actions";
import { useSession } from "next-auth/react";

export const PusherEventListener = ({ roomId }: { roomId: string }) => {
  const session = useSession();

  useEffect(() => {
    const channel = pusher.subscribe(roomId);

    channel.bind("api.players.create", async () => {
      console.log("api.players.create");
      /*
        if (data.id === player.id) {
          return;
        }
        */
      api.rooms.revalidate({ roomId });
    });

    channel.bind(
      "api.players.update",
      async (data: API["players"]["update"]) => {
        console.log("api.players.update", data);

        if (session.data?.user?.id === data.profileId) {
          return;
        }

        api.rooms.revalidate({ roomId });
      }
    );

    channel.bind(
      "api.profiles.update",
      async (data: RouterOutput["players"]["update"]) => {
        console.log("api.profiles.update", data);

        // await context.players.find.invalidate({ roomId });
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
  }, [roomId, session.data]);

  return null;
};
