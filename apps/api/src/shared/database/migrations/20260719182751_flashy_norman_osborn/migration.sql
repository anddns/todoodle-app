CREATE TYPE "priority" AS ENUM('p1', 'p2', 'p3', 'p4');--> statement-breakpoint
CREATE TABLE "users" (
	"id" uuid PRIMARY KEY DEFAULT uuidv7(),
	"email" text NOT NULL UNIQUE,
	"name" text NOT NULL,
	"verified_at" timestamp with time zone,
	"password" text NOT NULL,
	"updated_at" timestamp with time zone DEFAULT now() NOT NULL,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "tasks" (
	"id" uuid PRIMARY KEY DEFAULT uuidv7(),
	"title" text NOT NULL,
	"description" text,
	"priority" "priority" DEFAULT 'p4'::"priority",
	"is_all_day" boolean DEFAULT true,
	"due_at" timestamp with time zone,
	"completed_at" timestamp with time zone,
	"updated_at" timestamp with time zone DEFAULT now() NOT NULL,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL
);
