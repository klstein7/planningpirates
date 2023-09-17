"use server";

import { revalidatePath } from "next/cache";
import { z } from "zod";
import { RoomGetSchema } from "../schemas/rooms";
import { db } from "@/lib/db";
import { players, rooms } from "@/lib/db/schema";
import { eq } from "drizzle-orm";
import { authorize } from "../auth";
import { createId } from "@paralleldrive/cuid2";
import { customAlphabet } from "nanoid";

const nanoid = customAlphabet("1234567890ABCDEFGHIJKLMNOPQRSTUVWXYZ", 4);

export const revalidate = ({ roomId }: { roomId: string }) => {
  revalidatePath(`/r/${roomId}`);
};

export const get = (input: z.infer<typeof RoomGetSchema>) => {
  const { id } = RoomGetSchema.parse(input);

  return db.query.rooms.findFirst({
    where: eq(rooms.id, id),
  });
};

export const create = async () => {
  const session = await authorize();

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
    profileId: session.user.id,
    role: "host",
  });

  return room;
};
