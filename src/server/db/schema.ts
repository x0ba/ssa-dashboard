// Example model schema from the Drizzle docs
// https://orm.drizzle.team/docs/sql-schema-declaration

import { relations } from "drizzle-orm";
import { index, pgTableCreator, unique } from "drizzle-orm/pg-core";

/**
 * This is an example of how to use the multi-project schema feature of Drizzle ORM. Use the same
 * database instance for multiple projects.
 *
 * @see https://orm.drizzle.team/docs/goodies#multi-project-schema
 */
export const createTable = pgTableCreator((name) => `ssamembers_${name}`);

export const links = createTable(
  "link",
  (d) => ({
    id: d.integer().primaryKey().generatedByDefaultAsIdentity(),
    name: d.varchar({ length: 256 }).notNull(),
    url: d.varchar({ length: 1024 }).notNull(),
    tag: d.varchar({ length: 256 }).default("General"),
    createdAt: d
      .timestamp({ withTimezone: true })
      .$defaultFn(() => /* @__PURE__ */ new Date())
      .notNull(),
    updatedAt: d.timestamp({ withTimezone: true }).$onUpdate(() => new Date()),
  }),
  (t) => [index("links_name_idx").on(t.name)],
);

export const events = createTable(
  "event",
  (d) => ({
    id: d.integer().primaryKey().generatedByDefaultAsIdentity(),
    name: d.varchar({ length: 256 }).notNull(),
    imageUrl: d
      .varchar({ length: 1024 })
      .default(
        "https://ba961nquml.ufs.sh/f/8WZL3qQlnrib7eKeL1A2EOHTiwGzyx0cWs9IqK7hPnj3YaLU",
      ),
    location: d.varchar({ length: 256 }).notNull(),
    date: d.timestamp({ withTimezone: true }).notNull(),
    endDate: d.timestamp({ withTimezone: true }),
    createdAt: d
      .timestamp({ withTimezone: true })
      .$defaultFn(() => /* @__PURE__ */ new Date())
      .notNull(),
    updatedAt: d.timestamp({ withTimezone: true }).$onUpdate(() => new Date()),
  }),
  (t) => [index("events_name_idx").on(t.name)],
);

export const rsvps = createTable(
  "rsvp",
  (d) => ({
    id: d.integer().primaryKey().generatedByDefaultAsIdentity(),

    // FOREIGN KEY: This links the RSVP to the specific event.
    // { onDelete: "cascade" } automatically removes these RSVPs if the parent Event is deleted.
    eventId: d
      .integer()
      .notNull()
      .references(() => events.id, { onDelete: "cascade" }),

    // Guest details
    name: d.varchar({ length: 256 }).notNull(),
    email: d.varchar({ length: 256 }).notNull(),

    createdAt: d
      .timestamp({ withTimezone: true })
      .notNull()
      .$defaultFn(() => new Date()),
  }),
  (t) => [
    // INDEX: Makes fetching "all guests for event X" extremely fast
    index("rsvp_event_id_idx").on(t.eventId),

    // CONSTRAINT: Ensures one email cannot RSVP twice for the same event
    unique("unique_rsvp_per_event").on(t.eventId, t.email),
  ],
);

export const eventsRelations = relations(events, ({ many }) => ({
  rsvps: many(rsvps),
}));

export const rsvpsRelations = relations(rsvps, ({ one }) => ({
  event: one(events, {
    fields: [rsvps.eventId],
    references: [events.id],
  }),
}));
