"use server";

import { db } from "@/lib/db";
import { authorize } from "../auth";
import { profiles } from "@/lib/db/schema";
import { eq } from "drizzle-orm";
import { getRandomAvatarUrl } from "@/app/_util/avatars";
import { getRandomColor } from "@/app/_util/colors";
import { z } from "zod";
import {
  ProfileCreateSchema,
  ProfileGetSchema,
  ProfileUpdateSchema,
} from "../schemas/profiles";
import { pusher } from "@/lib/pusher";
import { revalidatePath } from "next/cache";

export const sync = async () => {
  const session = await authorize();

  const profile = await db.query.profiles.findFirst({
    where: eq(profiles.id, session.user.id),
  });

  if (!profile) {
    await db.insert(profiles).values({
      id: session.user.id,
      name: session.user.firstName ?? "",
      avatarUrl: getRandomAvatarUrl(),
      color: getRandomColor(),
    });
  }

  revalidatePath("/");
};

export const get = async (input?: z.infer<typeof ProfileGetSchema>) => {
  let userId: string;

  if (input) {
    userId = ProfileGetSchema.parse(input).id;
  } else {
    const session = await authorize();
    userId = session.user.id;
  }

  return db.query.profiles.findFirst({
    where: eq(profiles.id, userId),
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

export const create = async (input: z.infer<typeof ProfileCreateSchema>) => {
  const { id, ...values } = ProfileCreateSchema.parse(input);
  const results = await db
    .insert(profiles)
    .values({
      id,
      ...values,
      avatarUrl: getRandomAvatarUrl(),
      color: getRandomColor(),
    })
    .returning();

  const profile = results.pop();

  if (!profile) {
    throw new Error("Failed to create profile");
  }

  return profile;
};
