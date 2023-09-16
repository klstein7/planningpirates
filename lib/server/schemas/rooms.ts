import { rooms } from "@/lib/db/schema";
import { createInsertSchema, createSelectSchema } from "drizzle-zod";

export const RoomGetSchema = createSelectSchema(rooms).pick({
  id: true,
});

export const RoomUpdateSchema = createInsertSchema(rooms).pick({
  id: true,
  status: true,
});
