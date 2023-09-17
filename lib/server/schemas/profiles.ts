import { profiles } from "@/lib/db/schema";
import { createInsertSchema, createSelectSchema } from "drizzle-zod";

export const ProfileUpdateSchema = createInsertSchema(profiles).pick({
  name: true,
  avatarUrl: true,
  color: true,
});

export const ProfileCreateSchema = createInsertSchema(profiles).pick({
  id: true,
  name: true,
});

export const ProfileGetSchema = createSelectSchema(profiles).pick({
  id: true,
});
