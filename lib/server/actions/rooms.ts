"use server";

import { revalidatePath } from "next/cache";
import { z } from "zod";
import { RoomGetSchema, RoomUpdateSchema } from "../schemas/rooms";
import { db } from "@/lib/db";
import { players, rooms } from "@/lib/db/schema";
import { and, eq } from "drizzle-orm";
import { authorize } from "../auth";
import { createId } from "@paralleldrive/cuid2";
import { customAlphabet } from "nanoid";
import { openai } from "@/lib/openai";
import { getAlignmentPercentage, getAverage, getMedian } from "@/lib/utils";
import { pusher } from "@/lib/pusher";

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

export const update = async (input: z.infer<typeof RoomUpdateSchema>) => {
  const session = await authorize();
  const { id, ...values } = RoomUpdateSchema.parse(input);

  const room = await db.query.rooms.findFirst({
    where: eq(rooms.id, id),
  });

  if (!room) {
    throw new Error("Room not found");
  }

  const player = await db.query.players.findFirst({
    where: and(
      eq(players.roomId, room.id),
      eq(players.profileId, session.user.id),
      eq(players.role, "host")
    ),
  });

  if (!player) {
    throw new Error("You are not the host of this room");
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
      .filter((p) => p.selectedValue)
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
    throw new Error("Failed to update room");
  }

  await pusher.trigger(updated.id, "api.rooms.update", updated);

  return updated;
};
