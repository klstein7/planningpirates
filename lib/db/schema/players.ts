import { relations } from "drizzle-orm";
import {
  pgTable,
  varchar,
  integer,
  timestamp,
  unique,
} from "drizzle-orm/pg-core";
import { rooms, users } from ".";

export const players = pgTable(
  "players",
  {
    id: varchar("id", { length: 26 }).primaryKey(),
    userId: varchar("user_id", { length: 36 })
      .references(() => users.id)
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
    unq: unique().on(t.userId, t.roomId),
  })
);

export const playersRelations = relations(players, ({ one }) => ({
  user: one(users, {
    fields: [players.userId],
    references: [users.id],
  }),
  room: one(rooms, {
    fields: [players.roomId],
    references: [rooms.id],
  }),
}));
