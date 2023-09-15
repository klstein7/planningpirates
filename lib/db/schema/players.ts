import { relations } from "drizzle-orm";
import {
  pgTable,
  varchar,
  integer,
  timestamp,
  unique,
} from "drizzle-orm/pg-core";
import { profiles, rooms } from ".";

export const players = pgTable(
  "players",
  {
    id: varchar("id", { length: 26 }).primaryKey(),
    profileId: varchar("profile_id", { length: 36 })
      .references(() => profiles.id)
      .notNull(),
    roomId: varchar("room_id", { length: 26 })
      .references(() => rooms.id)
      .notNull(),
    role: varchar("role", {
      enum: ["host", "guest"],
    })
      .default("guest")
      .notNull(),
    selectedValue: integer("selected_value"),
    createdAt: timestamp("created_at").defaultNow(),
    updatedAt: timestamp("updated_at").defaultNow(),
  },
  (t) => ({
    unq: unique().on(t.profileId, t.roomId),
  })
);

export const playersRelations = relations(players, ({ one }) => ({
  profile: one(profiles, {
    fields: [players.profileId],
    references: [profiles.id],
  }),
  room: one(rooms, {
    fields: [players.roomId],
    references: [rooms.id],
  }),
}));
