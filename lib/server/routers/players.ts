import { db } from "@/lib/db";
import {
  PlayerFindSchema,
  PlayerSyncSchema,
  PlayerUpdateSchema,
} from "../schemas/players";
import { protectedProcedure, router } from "../trpc";
import { and, eq } from "drizzle-orm";
import { players } from "@/lib/db/schema";
import { createId } from "@paralleldrive/cuid2";

export const playersRouter = router({
  sync: protectedProcedure
    .input(PlayerSyncSchema)
    .mutation(async ({ ctx, input }) => {
      const player = await db.query.players.findFirst({
        where: and(
          eq(players.roomId, input.roomId),
          eq(players.profileId, ctx.session.user.id)
        ),
      });

      if (!player) {
        await db.insert(players).values({
          id: createId(),
          roomId: input.roomId,
          profileId: ctx.session.user.id,
          role: "guest",
        });
      }
    }),
  find: protectedProcedure.input(PlayerFindSchema).query(async ({ input }) => {
    return db.query.players.findMany({
      where: eq(players.roomId, input.roomId),
      with: {
        profile: true,
      },
    });
  }),
  update: protectedProcedure
    .input(PlayerUpdateSchema)
    .mutation(async ({ ctx, input }) => {
      const { id, ...values } = input;
      const results = await db
        .update(players)
        .set({
          ...values,
        })
        .where(eq(players.id, id))
        .returning();

      const player = results.pop();

      if (!player) {
        throw new Error("Failed to update player");
      }

      return player;
    }),
});
