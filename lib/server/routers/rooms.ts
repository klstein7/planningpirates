import { z } from "zod";
import { protectedProcedure, router } from "../trpc";
import { db } from "@/lib/db";
import { players, rooms } from "@/lib/db/schema";
import { customAlphabet } from "nanoid";
import { createId } from "@paralleldrive/cuid2";

const nanoid = customAlphabet("1234567890ABCDEFGHIJKLMNOPQRSTUVWXYZ", 4);

export const roomsRouter = router({
  create: protectedProcedure.mutation(async ({ ctx }) => {
    const results = await db
      .insert(rooms)
      .values({
        id: nanoid(),
      })
      .returning();

    const room = results.pop();

    if (!room) {
      throw new Error("Failed to create room");
    }

    await db.insert(players).values({
      id: createId(),
      roomId: room.id,
      profileId: ctx.session.user.id,
      role: "host",
    });

    return room;
  }),
});
