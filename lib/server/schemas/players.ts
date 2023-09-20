import { players } from "@/lib/db/schema";
import { createInsertSchema, createSelectSchema } from "drizzle-zod";

export const PlayerFindSchema = createSelectSchema(players).pick({
  roomId: true,
});

export const PlayerSyncSchema = createSelectSchema(players).pick({
  roomId: true,
});

export const PlayerUpdateSchema = createInsertSchema(players).pick({
  id: true,
  selectedValue: true,
  role: true,
  roomId: true,
});
