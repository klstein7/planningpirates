"use server";

import { db } from "@/lib/db";
import { and, asc, eq } from "drizzle-orm";
import { PlayerFindSchema, PlayerUpdateSchema } from "../schemas/players";
import { players } from "@/lib/db/schema";
import { z } from "zod";
import { authorize } from "../auth";
import { createId } from "@paralleldrive/cuid2";
import { pusher } from "@/lib/pusher";
import { api } from ".";

export const find = async (input: z.infer<typeof PlayerFindSchema>) => {
  const session = await authorize();
  const { roomId } = PlayerFindSchema.parse(input);

  let player = await db.query.players.findFirst({
    where: and(
      eq(players.roomId, roomId),
      eq(players.profileId, session.user.id)
    ),
  });

  if (!player) {
    const results = await db
      .insert(players)
      .values({
        id: createId(),
        roomId: input.roomId,
        profileId: session.user.id,
        role: "guest",
      })
      .returning();

    player = results.pop();

    if (!player) {
      throw new Error("Failed to create player");
    }

    await pusher.trigger(player.roomId, "api.players.create", player);
  }

  return db.query.players.findMany({
    where: eq(players.roomId, roomId),
    with: {
      profile: true,
    },
    orderBy: asc(players.createdAt),
  });
};

export const update = async (input: z.infer<typeof PlayerUpdateSchema>) => {
  const session = await authorize();
  const { id, roomId, ...values } = PlayerUpdateSchema.parse(input);

  let player = await db.query.players.findFirst({
    where: and(
      eq(players.profileId, session.user.id),
      eq(players.roomId, roomId)
    ),
  });

  if (!player) {
    throw new Error("Player not found");
  }

  if (session.user.id !== player.profileId && player.role !== "host") {
    throw new Error("Unauthorized");
  }

  if (values.role === "host") {
    await db
      .update(players)
      .set({
        role: "guest",
      })
      .where(eq(players.roomId, player.roomId));
  }

  const results = await db
    .update(players)
    .set({
      ...values,
    })
    .where(eq(players.id, id))
    .returning();

  player = results.pop();

  if (!player) {
    throw new Error("Failed to update player");
  }

  await pusher.trigger(player.roomId, "api.players.update", player);

  return player;
};
