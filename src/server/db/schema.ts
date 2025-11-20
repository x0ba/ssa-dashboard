// Example model schema from the Drizzle docs
// https://orm.drizzle.team/docs/sql-schema-declaration

import { index, pgTableCreator } from "drizzle-orm/pg-core";

/**
 * This is an example of how to use the multi-project schema feature of Drizzle ORM. Use the same
 * database instance for multiple projects.
 *
 * @see https://orm.drizzle.team/docs/goodies#multi-project-schema
 */
export const createTable = pgTableCreator((name) => `ssamembers_${name}`);

export const events = createTable(
  "event",
  (d) => ({
    id: d.integer().primaryKey().generatedByDefaultAsIdentity(),
    name: d.varchar({ length: 256 }),
    createdAt: d
      .timestamp({ withTimezone: true })
      .$defaultFn(() => /* @__PURE__ */ new Date())
      .notNull(),
    updatedAt: d.timestamp({ withTimezone: true }).$onUpdate(() => new Date()),
    description: d.text(),
    date: d.timestamp({ withTimezone: true }),
    location: d.varchar({ length: 256 }),
    link: d.varchar({ length: 256 }),
    image: d.varchar({ length: 256 }),
    tags: d.varchar({ length: 256 }),
    isPublic: d.boolean().notNull().default(false),
    isFeatured: d.boolean().notNull().default(false),
    isArchived: d.boolean().notNull().default(false),
  }),
  (t) => [index("name_idx").on(t.name)],
);
