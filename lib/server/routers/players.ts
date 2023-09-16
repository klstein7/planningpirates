import { db } from "@/lib/db";
import {
  PlayerFindSchema,
  PlayerSyncSchema,
  PlayerUpdateSchema,
} from "../schemas/players";
import { protectedProcedure, router } from "../trpc";
import { and, asc, eq } from "drizzle-orm";
import { players } from "@/lib/db/schema";
import { createId } from "@paralleldrive/cuid2";
import { pusher } from "@/lib/pusher";

export const playersRouter = router({
  sync: protectedProcedure
    .input(PlayerSyncSchema)
    .mutation(async ({ ctx, input }) => {
      let player = await db.query.players.findFirst({
        where: and(
          eq(players.roomId, input.roomId),
          eq(players.profileId, ctx.session.user.id)
        ),
      });

      if (!player) {
        const results = await db
          .insert(players)
          .values({
            id: createId(),
            roomId: input.roomId,
            profileId: ctx.session.user.id,
            role: "guest",
          })
          .returning();

        player = results.pop();

        if (!player) {
          throw new Error("Failed to create player");
        }

        await pusher.trigger(player.roomId, "api.players.create", player);
      }

      return player;
    }),
  find: protectedProcedure.input(PlayerFindSchema).query(async ({ input }) => {
    return db.query.players.findMany({
      where: eq(players.roomId, input.roomId),
      with: {
        profile: true,
      },
      orderBy: asc(players.createdAt),
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

      const resp = await pusher.trigger(
        player.roomId,
        "api.players.update",
        player
      );

      console.log(resp);

      return player;
    }),
});
