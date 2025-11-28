import "server-only";
import { db } from "~/server/db";
import { unstable_cache } from "next/cache";

export const getHomepageData = unstable_cache(
  async () => {
    // Get start of today in UTC to include events happening today
    const startOfToday = new Date();
    startOfToday.setUTCHours(0, 0, 0, 0);

    const [events, links] = await Promise.all([
      db.query.events.findMany({
        where: (events, { gte }) => gte(events.date, startOfToday),
        limit: 3,
        orderBy: (model, { asc }) => asc(model.date),
      }),
      db.query.links.findMany({
        limit: 4,
        orderBy: (model, { desc }) => desc(model.createdAt),
      }),
    ]);

    return { events, links };
  },
  ["homepage-data"],
  { revalidate: 60, tags: ["events", "links"] },
);

export const getRecentEvents = unstable_cache(
  async (limit: number) => {
    // Get start of today in UTC to include events happening today
    const startOfToday = new Date();
    startOfToday.setUTCHours(0, 0, 0, 0);

    const events = await db.query.events.findMany({
      where: (events, { gte }) => gte(events.date, startOfToday),
      limit,
      orderBy: (model, { asc }) => asc(model.date),
    });
    return events;
  },
  ["recent-events"],
  { revalidate: 60, tags: ["events"] },
);

export const searchEvents = unstable_cache(
  async (query?: string) => {
    // Get start of today in UTC to include events happening today
    const startOfToday = new Date();
    startOfToday.setUTCHours(0, 0, 0, 0);

    const events = await db.query.events.findMany({
      where: (events, { ilike, gte, and }) => {
        const conditions = [];
        conditions.push(gte(events.date, startOfToday));
        if (query) conditions.push(ilike(events.name, `%${query}%`));
        return conditions.length > 1 ? and(...conditions) : conditions[0];
      },
      orderBy: (model, { asc }) => asc(model.date),
    });
    return events;
  },
  ["search-events"],
  { revalidate: 60, tags: ["events"] },
);

export const searchAllEvents = unstable_cache(
  async (query?: string) => {
    const events = await db.query.events.findMany({
      where: (events, { ilike }) =>
        query ? ilike(events.name, `%${query}%`) : undefined,
      orderBy: (model, { desc }) => desc(model.date),
    });
    return events;
  },
  ["search-all-events"],
  { revalidate: 60, tags: ["events"] },
);

export const getRecentLinks = unstable_cache(
  async (limit: number) => {
    const links = await db.query.links.findMany({
      limit,
      orderBy: (model, { desc }) => desc(model.createdAt),
    });
    return links;
  },
  ["recent-links"],
  { revalidate: 60, tags: ["links"] },
);

export const searchLinks = unstable_cache(
  async (query?: string, tag?: string) => {
    const links = await db.query.links.findMany({
      where: (links, { ilike, eq, and }) => {
        const conditions = [];
        if (query) conditions.push(ilike(links.name, `%${query}%`));
        if (tag && tag !== "all") conditions.push(eq(links.tag, tag));
        return conditions.length > 0 ? and(...conditions) : undefined;
      },
      orderBy: (model, { desc }) => desc(model.createdAt),
    });
    return links;
  },
  ["search-links"],
  { revalidate: 60, tags: ["links"] },
);

export const getAllTags = unstable_cache(
  async () => {
    const links = await db.query.links.findMany({
      columns: {
        tag: true,
      },
    });
    const tags = [
      ...new Set(
        links.map((link) => link.tag).filter((tag): tag is string => !!tag),
      ),
    ];
    return tags.sort();
  },
  ["all-tags"],
  { revalidate: 300, tags: ["links"] }, // Tags change less frequently
);

export const getLinkById = unstable_cache(
  async (id: number) => {
    const link = await db.query.links.findFirst({
      where: (links, { eq }) => eq(links.id, id),
    });
    return link;
  },
  ["link-by-id"],
  { revalidate: 60, tags: ["links"] },
);

export async function checkUserRsvp(
  eventId: number,
  email: string,
): Promise<boolean> {
  const rsvp = await db.query.rsvps.findFirst({
    where: (rsvps, { eq, and }) => {
      const eventIdCondition = eq(rsvps.eventId, eventId);
      const emailCondition = eq(rsvps.email, email);
      return and(eventIdCondition, emailCondition);
    },
  });
  return !!rsvp;
}
