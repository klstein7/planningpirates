import { players } from "@/lib/db/schema";
import { createSelectSchema } from "drizzle-zod";

export const PlayersFindSchema = createSelectSchema(players).pick({
  roomId: true,
});

export const PlayersSyncSchema = createSelectSchema(players).pick({
  roomId: true,
});
