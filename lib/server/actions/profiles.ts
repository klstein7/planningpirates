"use server";

import { db } from "@/lib/db";
import { authorize } from "../auth";
import { profiles } from "@/lib/db/schema";
import { eq } from "drizzle-orm";
import { getRandomAvatarUrl } from "@/app/_util/avatars";
import { getRandomColor } from "@/app/_util/colors";
import { z } from "zod";
import { ProfileUpdateSchema } from "../schemas/profiles";
import { pusher } from "@/lib/pusher";

export const sync = async () => {
  const session = await authorize();

  const profile = await db.query.profiles.findFirst({
    where: eq(profiles.id, session.user.id),
  });

  if (!profile) {
    await db.insert(profiles).values({
      id: session.user.id,
      name: session.user.name ?? "",
      avatarUrl: getRandomAvatarUrl(),
      color: getRandomColor(),
    });
  }
};

export const get = async () => {
  const session = await authorize();

  return db.query.profiles.findFirst({
    where: eq(profiles.id, session.user.id),
  });
};

const ProfileUpdateSchemaWithRoomId = ProfileUpdateSchema.extend({
  roomId: z.string().optional(),
});

export const update = async (
  input: z.infer<typeof ProfileUpdateSchemaWithRoomId>
) => {
  const session = await authorize();
  const { roomId, ...values } = ProfileUpdateSchemaWithRoomId.parse(input);
  const results = await db
    .update(profiles)
    .set({
      ...values,
      updatedAt: new Date(),
    })
    .where(eq(profiles.id, session.user.id))
    .returning();

  const profile = results.pop();

  if (!profile) {
    throw new Error("Failed to update profile");
  }

  if (roomId) {
    await pusher.trigger(roomId, "api.profiles.update", profile);
  }

  return profile;
};
