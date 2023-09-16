import { relations } from "drizzle-orm";
import { pgTable, varchar, timestamp, text } from "drizzle-orm/pg-core";
import { players } from "./players";

export const rooms = pgTable("rooms", {
  id: varchar("id", { length: 4 }).primaryKey(),
  title: text("title").default("").notNull(),
  statusMessage: text("status_message").default("").notNull(),
  status: varchar("status", {
    enum: ["voting", "revealed"],
  })
    .default("voting")
    .notNull(),
  createdAt: timestamp("created_at", {
    mode: "date",
  }).defaultNow(),
  updatedAt: timestamp("updated_at", {
    mode: "date",
  }).defaultNow(),
});

export const roomsRelations = relations(rooms, ({ many }) => ({
  players: many(players),
}));
