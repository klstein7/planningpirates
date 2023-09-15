import { db } from "@/lib/db";
import { PlayersFindSchema, PlayersSyncSchema } from "../schemas/players";
import { protectedProcedure, router } from "../trpc";
import { and, eq } from "drizzle-orm";
import { players } from "@/lib/db/schema";
import { createId } from "@paralleldrive/cuid2";

export const playersRouter = router({
  sync: protectedProcedure
    .input(PlayersSyncSchema)
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
  find: protectedProcedure.input(PlayersFindSchema).query(async ({ input }) => {
    return db.query.players.findMany({
      where: eq(players.roomId, input.roomId),
      with: {
        profile: true,
      },
    });
  }),
});
