import "server-only";
import { db } from "~/server/db";

export async function getHomepageData() {
  const [events, links] = await Promise.all([
    getRecentEvents(3),
    getRecentLinks(4),
  ]);

  return { events, links };
}

export async function getRecentEvents(limit: number) {
  // Get start of today in UTC to include events happening today
  const startOfToday = new Date();
  startOfToday.setUTCHours(0, 0, 0, 0);

  const events = await db.query.events.findMany({
    where: (events, { gte }) => gte(events.date, startOfToday),
    limit,
    orderBy: (model, { asc }) => asc(model.date),
  });
  return events;
}

export async function searchEvents(query?: string) {
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
}

export async function getRecentLinks(limit: number) {
  const links = await db.query.links.findMany({
    limit,
    orderBy: (model, { desc }) => desc(model.createdAt),
  });
  return links;
}

export async function searchLinks(query?: string, tag?: string) {
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
}

export async function getAllTags() {
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
}

export async function getLinkById(id: number) {
  const link = await db.query.links.findFirst({
    where: (links, { eq }) => eq(links.id, id),
  });
  return link;
}
