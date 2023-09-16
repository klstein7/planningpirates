import { profiles } from "@/lib/db/schema";
import { createInsertSchema } from "drizzle-zod";

export const ProfileUpdateSchema = createInsertSchema(profiles).pick({
  name: true,
  avatarUrl: true,
  color: true,
});
