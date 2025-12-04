const now = new Date();
now.setUTCHours(0, 0, 0, 0);

const pastEvent = {
  id: 1,
  name: "Past Event",
  date: new Date(now.getTime() - 86400000), // Yesterday
};

const todayEvent = {
  id: 2,
  name: "Today Event",
  date: new Date(now.getTime() + 3600000), // Today + 1 hour
};

const futureEvent = {
  id: 3,
  name: "Future Event",
  date: new Date(now.getTime() + 86400000), // Tomorrow
};

const rsvps = [
  { id: 101, event: pastEvent },
  { id: 102, event: todayEvent },
  { id: 103, event: futureEvent },
];

const filteredRsvps = rsvps.filter((rsvp) => {
  return rsvp.event.date >= now;
});

console.log("Current Date (Start of Today UTC):", now.toISOString());
console.log("Filtered RSVPs:");
filteredRsvps.forEach((rsvp) => {
  console.log(`- ${rsvp.event.name} (${rsvp.event.date.toISOString()})`);
});

if (
  filteredRsvps.length === 2 &&
  filteredRsvps.find((r) => r.id === 102) &&
  filteredRsvps.find((r) => r.id === 103)
) {
  console.log("SUCCESS: Logic correctly filters out past events.");
} else {
  console.error("FAILURE: Logic did not filter correctly.");
  process.exit(1);
}
