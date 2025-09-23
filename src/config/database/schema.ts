import {
  pgTable,
  text,
  uuid,
  timestamp,
  pgEnum,
  unique,
  integer,
  numeric,
  boolean,
  jsonb,
} from "drizzle-orm/pg-core";
import { relations, sql } from "drizzle-orm";

export const userRoleEnum = pgEnum("user_role", [
  "admin",
  "organizer",
  "attendee",
]);
export const eventStatusEnum = pgEnum("event_status", [
  "draft",
  "published",
  "cancelled",
  "completed",
]);
export const ticketStatusEnum = pgEnum("ticket_status", [
  "unpaid",
  "paid",
  "used",
  "cancelled",
]);
export const eventTypeEnum = pgEnum("event_type", [
  "conference",
  "workshop",
  "concert",
  "meetup",
  "webinar",
  "other",
]);
export const currencyEnum = pgEnum("currency", ["USD", "EUR", "BRL", "GBP"]);
export const documentTypeEnum = pgEnum("document_type", [
  "CPF",
  "RG",
  "Passport",
  "Other",
]);

export const userStatusEnum = pgEnum("user_status", [
  "active",
  "suspended",
  "inactive",
]);

// --- User Table ---
export const users = pgTable(
  "users",
  {
    id: uuid("id")
      .default(sql`gen_random_uuid()`)
      .primaryKey(),
    name: text("name").notNull(),
    email: text("email").notNull().unique(),
    passwordHash: text("password_hash").notNull(),
    documentType: documentTypeEnum("document_type").default("CPF").notNull(),
    documentNumber: text("document_number").unique().notNull(),
    status: userStatusEnum("status").notNull().default("active"),
    role: userRoleEnum("role").notNull().default("attendee"),
    createdAt: timestamp("created_at").defaultNow().notNull(),
    updatedAt: timestamp("updated_at").default(sql`now()`),
  },
  (table) => [
    {
      emailIndex: unique("email_idx").on(table.email),
    },
  ]
);

// --- Events Table ---
export const events = pgTable("events", {
  id: uuid("id")
    .default(sql`gen_random_uuid()`)
    .primaryKey(),
  title: text("title").notNull(),
  slug: text("slug").notNull().unique(),
  description: text("description"),
  status: eventStatusEnum("status").default("draft").notNull(),
  type: eventTypeEnum("type").default("other").notNull(),
  location: text("location").notNull(),
  address: text("address"),
  latitude: numeric("latitude"),
  longitude: numeric("longitude"),
  startAt: timestamp("start_at", { mode: "date" }).notNull(),
  endAt: timestamp("end_at", { mode: "date" }).notNull(),
  registrationDeadline: timestamp("registration_deadline", {
    mode: "date",
  }),
  capacity: integer("capacity").notNull(),
  minAge: integer("min_age"),
  maxTicketsPerUser: integer("max_tickets_per_user"),
  price: numeric("price", { precision: 10, scale: 2 }).default("0.00"),
  currency: currencyEnum("currency").default("BRL").notNull(),
  isPublic: boolean("is_public").default(false).notNull(),
  imageUrl: text("image_url"),
  metadata: jsonb("metadata").default({}),
  organizerId: uuid("organizer_id")
    .notNull()
    .references(() => users.id, { onDelete: "cascade" }),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").default(sql`now()`),
});

// --- Tickets Table ---
export const tickets = pgTable("tickets", {
  id: uuid("id")
    .default(sql`gen_random_uuid()`)
    .primaryKey(),
  validationCode: text("validation_code").notNull().unique(),
  guestName: text("guest_name"),
  status: ticketStatusEnum("status").notNull().default("unpaid"),
  userId: uuid("user_id")
    .notNull()
    .references(() => users.id, { onDelete: "cascade" }),
  eventId: uuid("event_id")
    .notNull()
    .references(() => events.id, { onDelete: "cascade" }),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

// --- Tags Table ---
export const tags = pgTable("tags", {
  id: uuid("id")
    .default(sql`gen_random_uuid()`)
    .primaryKey(),
  name: text("name").notNull().unique(),
});

// --- Event Tags Join Table ---
export const eventTags = pgTable(
  "event_tags",
  {
    eventId: uuid("event_id")
      .notNull()
      .references(() => events.id, { onDelete: "cascade" }),
    tagId: uuid("tag_id")
      .notNull()
      .references(() => tags.id, { onDelete: "cascade" }),
  },
  (table) => [
    {
      pk: unique().on(table.eventId, table.tagId),
    },
  ]
);

// --- Drizzle Relations ---
export const usersRelations = relations(users, ({ many }) => ({
  events: many(events),
  tickets: many(tickets),
}));

export const eventsRelations = relations(events, ({ one, many }) => ({
  organizer: one(users, {
    fields: [events.organizerId],
    references: [users.id],
  }),
  eventTags: many(eventTags),
  tickets: many(tickets),
}));

export const ticketsRelations = relations(tickets, ({ one }) => ({
  user: one(users, {
    fields: [tickets.userId],
    references: [users.id],
  }),
  event: one(events, {
    fields: [tickets.eventId],
    references: [events.id],
  }),
}));

export const tagsRelations = relations(tags, ({ many }) => ({
  eventTags: many(eventTags),
}));

export const eventTagsRelations = relations(eventTags, ({ one }) => ({
  event: one(events, {
    fields: [eventTags.eventId],
    references: [events.id],
  }),
  tag: one(tags, {
    fields: [eventTags.tagId],
    references: [tags.id],
  }),
}));
