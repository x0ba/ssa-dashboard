import "server-only";
import { db } from "~/server/db";

export async function getRecentEvents(limit: number) {
  const events = await db.query.events.findMany({
    limit,
    orderBy: (model, { desc }) => desc(model.date),
  });
  return events;
}

export async function searchEvents(query?: string) {
  const events = await db.query.events.findMany({
    where: (events, { ilike }) =>
      query ? ilike(events.name, `%${query}%`) : undefined,
    orderBy: (model, { desc }) => desc(model.date),
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

export async function searchLinks(query?: string) {
  const links = await db.query.links.findMany({
    where: (links, { ilike }) =>
      query ? ilike(links.name, `%${query}%`) : undefined,
    orderBy: (model, { desc }) => desc(model.createdAt),
  });
  return links;
}
