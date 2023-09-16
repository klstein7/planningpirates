import { z } from "zod";
import { protectedProcedure, router } from "../trpc";
import { db } from "@/lib/db";
import { players, rooms } from "@/lib/db/schema";
import { customAlphabet } from "nanoid";
import { createId } from "@paralleldrive/cuid2";
import { RoomGetSchema, RoomUpdateSchema } from "../schemas/rooms";
import { TRPCError } from "@trpc/server";
import { and, eq } from "drizzle-orm";
import { pusher } from "@/lib/pusher";

const nanoid = customAlphabet("1234567890ABCDEFGHIJKLMNOPQRSTUVWXYZ", 4);

export const roomsRouter = router({
  get: protectedProcedure.input(RoomGetSchema).query(async ({ ctx, input }) => {
    return db.query.rooms.findFirst({
      where: eq(rooms.id, input.id),
    });
  }),
  create: protectedProcedure.mutation(async ({ ctx }) => {
    const results = await db
      .insert(rooms)
      .values({
        id: nanoid(),
      })
      .returning();

    const room = results.pop();

    if (!room) {
      throw new TRPCError({
        code: "INTERNAL_SERVER_ERROR",
        message: "Failed to create room",
      });
    }

    await db.insert(players).values({
      id: createId(),
      roomId: room.id,
      profileId: ctx.session.user.id,
      role: "host",
    });

    return room;
  }),
  update: protectedProcedure
    .input(RoomUpdateSchema)
    .mutation(async ({ ctx, input }) => {
      const { id, ...values } = input;

      const room = await db.query.rooms.findFirst({
        where: eq(rooms.id, id),
      });

      if (!room) {
        throw new TRPCError({
          code: "NOT_FOUND",
          message: "Room not found",
        });
      }

      const player = await db.query.players.findFirst({
        where: and(
          eq(players.roomId, room.id),
          eq(players.profileId, ctx.session.user.id),
          eq(players.role, "host")
        ),
      });

      if (!player) {
        throw new TRPCError({
          code: "FORBIDDEN",
          message: "You are not the host of this room",
        });
      }

      const results = await db
        .update(rooms)
        .set({
          ...values,
        })
        .where(eq(rooms.id, id))
        .returning();

      const updated = results.pop();

      if (!updated) {
        throw new TRPCError({
          code: "INTERNAL_SERVER_ERROR",
          message: "Failed to update room",
        });
      }

      await pusher.trigger(updated.id, "api.rooms.update", updated);

      return updated;
    }),
});
