import { db } from "@/lib/db";
import { protectedProcedure, router } from "../trpc";
import { eq } from "drizzle-orm";
import { profiles } from "@/lib/db/schema";
import { getRandomAvatarUrl } from "@/app/_util/avatars";
import { getRandomColor } from "@/app/_util/colors";
import { ProfileUpdateSchema } from "../schemas/profiles";
import { z } from "zod";
import { pusher } from "@/lib/pusher";

export const profilesRouter = router({
  sync: protectedProcedure.mutation(async ({ ctx }) => {
    const profile = await db.query.profiles.findFirst({
      where: eq(profiles.id, ctx.session.user.id),
    });

    if (!profile) {
      await db.insert(profiles).values({
        id: ctx.session.user.id,
        name: ctx.session.user.name ?? "",
        avatarUrl: getRandomAvatarUrl(),
        color: getRandomColor(),
      });
    }
  }),
  get: protectedProcedure.query(async ({ ctx }) => {
    return db.query.profiles.findFirst({
      where: eq(profiles.id, ctx.session.user.id),
    });
  }),
  update: protectedProcedure
    .input(
      ProfileUpdateSchema.extend({
        roomId: z.string().optional(),
      })
    )
    .mutation(async ({ ctx, input }) => {
      const { roomId, ...values } = input;
      const results = await db
        .update(profiles)
        .set({
          ...values,
          updatedAt: new Date(),
        })
        .where(eq(profiles.id, ctx.session.user.id))
        .returning();

      const profile = results.pop();

      if (!profile) {
        throw new Error("Failed to update profile");
      }

      if (roomId) {
        await pusher.trigger(roomId, "api.profiles.update", profile);
      }

      return profile;
    }),
});
