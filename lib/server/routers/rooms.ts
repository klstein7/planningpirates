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
import { openai } from "@/lib/openai";
import { getAlignmentPercentage, getAverage, getMedian } from "@/lib/utils";

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

      let statusMessage = "";

      if (values.status === "revealed") {
        const playersInRoom = await db.query.players.findMany({
          where: eq(players.roomId, room.id),
          with: {
            profile: true,
          },
        });

        const crewmates = playersInRoom
          .map((p) => `${p.profile.name}: ${p.selectedValue}`)
          .join(", ");

        const selectedValues = playersInRoom
          .filter((p) => p.selectedValue)
          .map((p) => p.selectedValue) as number[];

        const completion = await openai.chat.completions.create({
          model: "ft:gpt-3.5-turbo-0613:personal::7zUH19os",
          messages: [
            {
              role: "user",
              content: `
            Act as a quick-witted pirate data analyst aboard a ship, arrr!
            Given the plannin' poker session with crewmates [${crewmates}], an average of [${getAverage(
              selectedValues
            )}], and a median of [${getMedian(
              selectedValues
            )}], what do these numbers and our alignment of [${getAlignmentPercentage(
              selectedValues
            )}%] foretell for our next adventure, in a sentence or two?
            `,
            },
          ],
        });

        statusMessage = completion.choices[0]?.message?.content ?? "";
      } else {
        await db
          .update(players)
          .set({
            selectedValue: null,
          })
          .where(eq(players.roomId, room.id));

        statusMessage = "";
      }

      const results = await db
        .update(rooms)
        .set({
          ...values,
          statusMessage,
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
