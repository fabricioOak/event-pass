CREATE TYPE "public"."currency" AS ENUM('USD', 'EUR', 'BRL', 'GBP');--> statement-breakpoint
CREATE TYPE "public"."document_type" AS ENUM('CPF', 'RG', 'Passport', 'Other');--> statement-breakpoint
CREATE TYPE "public"."event_status" AS ENUM('draft', 'published', 'cancelled', 'completed');--> statement-breakpoint
CREATE TYPE "public"."event_type" AS ENUM('conference', 'workshop', 'concert', 'meetup', 'webinar', 'other');--> statement-breakpoint
CREATE TYPE "public"."ticket_status" AS ENUM('unpaid', 'paid', 'used', 'cancelled');--> statement-breakpoint
CREATE TYPE "public"."user_role" AS ENUM('admin', 'organizer', 'attendee');--> statement-breakpoint
CREATE TABLE "event_tags" (
	"event_id" uuid NOT NULL,
	"tag_id" uuid NOT NULL
);
--> statement-breakpoint
CREATE TABLE "events" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"title" text NOT NULL,
	"slug" text NOT NULL,
	"description" text,
	"status" "event_status" DEFAULT 'draft' NOT NULL,
	"type" "event_type" DEFAULT 'other' NOT NULL,
	"location" text NOT NULL,
	"address" text,
	"latitude" numeric,
	"longitude" numeric,
	"start_at" timestamp NOT NULL,
	"end_at" timestamp NOT NULL,
	"registration_deadline" timestamp,
	"capacity" integer NOT NULL,
	"min_age" integer,
	"max_tickets_per_user" integer,
	"price" numeric(10, 2) DEFAULT '0.00',
	"currency" "currency" DEFAULT 'BRL' NOT NULL,
	"is_public" boolean DEFAULT false NOT NULL,
	"image_url" text,
	"metadata" jsonb DEFAULT '{}'::jsonb,
	"organizer_id" uuid NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now(),
	CONSTRAINT "events_slug_unique" UNIQUE("slug")
);
--> statement-breakpoint
CREATE TABLE "tags" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"name" text NOT NULL,
	CONSTRAINT "tags_name_unique" UNIQUE("name")
);
--> statement-breakpoint
CREATE TABLE "tickets" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"validation_code" text NOT NULL,
	"guest_name" text,
	"status" "ticket_status" DEFAULT 'unpaid' NOT NULL,
	"user_id" uuid NOT NULL,
	"event_id" uuid NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL,
	CONSTRAINT "tickets_validation_code_unique" UNIQUE("validation_code")
);
--> statement-breakpoint
CREATE TABLE "users" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"name" text NOT NULL,
	"email" text NOT NULL,
	"password_hash" text NOT NULL,
	"document_type" "document_type",
	"document_number" text,
	"status" text DEFAULT 'active' NOT NULL,
	"role" "user_role" DEFAULT 'attendee' NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now(),
	CONSTRAINT "users_email_unique" UNIQUE("email"),
	CONSTRAINT "users_document_number_unique" UNIQUE("document_number")
);
--> statement-breakpoint
ALTER TABLE "event_tags" ADD CONSTRAINT "event_tags_event_id_events_id_fk" FOREIGN KEY ("event_id") REFERENCES "public"."events"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "event_tags" ADD CONSTRAINT "event_tags_tag_id_tags_id_fk" FOREIGN KEY ("tag_id") REFERENCES "public"."tags"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "events" ADD CONSTRAINT "events_organizer_id_users_id_fk" FOREIGN KEY ("organizer_id") REFERENCES "public"."users"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "tickets" ADD CONSTRAINT "tickets_user_id_users_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."users"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "tickets" ADD CONSTRAINT "tickets_event_id_events_id_fk" FOREIGN KEY ("event_id") REFERENCES "public"."events"("id") ON DELETE cascade ON UPDATE no action;