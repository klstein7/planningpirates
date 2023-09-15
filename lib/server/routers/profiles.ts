import { db } from "@/lib/db";
import { protectedProcedure, router } from "../trpc";
import { eq } from "drizzle-orm";
import { profiles } from "@/lib/db/schema";
import { getRandomAvatarUrl } from "@/app/_util/avatars";
import { getRandomColor } from "@/app/_util/colors";

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
});
