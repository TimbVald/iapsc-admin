CREATE TABLE "about_data" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"typewriter_texts" jsonb,
	"mission_title" text,
	"mission_description" jsonb,
	"mission_highlight" text,
	"action_buttons" jsonb,
	"media_content" jsonb,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "about_stats" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"value" varchar NOT NULL,
	"label" text NOT NULL,
	"color" varchar NOT NULL,
	"bg_gradient" varchar NOT NULL,
	"border_color" varchar NOT NULL,
	"text_color" varchar NOT NULL,
	"hover_color" varchar NOT NULL,
	"order" integer DEFAULT 0,
	"created_at" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "comparison_data" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"features" jsonb,
	"comparison_images" jsonb,
	"diagnostic_steps" jsonb,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "events" (
	"id" varchar PRIMARY KEY NOT NULL,
	"slug" varchar NOT NULL,
	"title" text NOT NULL,
	"date" date NOT NULL,
	"end_date" date,
	"time" time,
	"end_time" time,
	"location" text NOT NULL,
	"description" text,
	"post" text,
	"image" text NOT NULL,
	"images" jsonb,
	"category" varchar NOT NULL,
	"attendees" integer DEFAULT 0,
	"featured" boolean DEFAULT false,
	"agenda" jsonb,
	"speakers" jsonb,
	"objectives" jsonb,
	"requirements" jsonb,
	"benefits" jsonb,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL,
	CONSTRAINT "events_slug_unique" UNIQUE("slug")
);
--> statement-breakpoint
CREATE TABLE "gallery_images" (
	"id" varchar PRIMARY KEY NOT NULL,
	"url" text NOT NULL,
	"alt" text NOT NULL,
	"photographer" text NOT NULL,
	"username" varchar NOT NULL,
	"likes" integer DEFAULT 0,
	"downloads" integer DEFAULT 0,
	"featured" boolean DEFAULT false,
	"created_at" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "hero_slides" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"title" text,
	"subtitle" text,
	"description" text,
	"icon" varchar NOT NULL,
	"gradient" varchar NOT NULL,
	"video" text,
	"image" text,
	"cta" text NOT NULL,
	"link" text NOT NULL,
	"link2" text,
	"secondary_cta" text,
	"order" integer DEFAULT 0,
	"active" boolean DEFAULT true,
	"created_at" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "key_stats" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"number" varchar NOT NULL,
	"label" text NOT NULL,
	"icon" varchar NOT NULL,
	"trend" varchar,
	"order" integer DEFAULT 0,
	"created_at" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "news" (
	"id" integer PRIMARY KEY NOT NULL,
	"slug" varchar NOT NULL,
	"title" text NOT NULL,
	"excerpt" text NOT NULL,
	"description" text NOT NULL,
	"post" text,
	"date" date NOT NULL,
	"image" text NOT NULL,
	"category" varchar NOT NULL,
	"read_time" varchar NOT NULL,
	"author" text,
	"featured" boolean DEFAULT false,
	"introduction" text,
	"sections" jsonb,
	"conclusion" text,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL,
	CONSTRAINT "news_slug_unique" UNIQUE("slug")
);
--> statement-breakpoint
CREATE TABLE "partner_categories" (
	"id" varchar PRIMARY KEY NOT NULL,
	"name" varchar NOT NULL,
	"color" varchar NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "partners" (
	"id" integer PRIMARY KEY NOT NULL,
	"name" varchar NOT NULL,
	"logo" text NOT NULL,
	"description" text NOT NULL,
	"website" text,
	"category" varchar NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "resources" (
	"id" varchar PRIMARY KEY NOT NULL,
	"slug" varchar NOT NULL,
	"title" text NOT NULL,
	"description" text NOT NULL,
	"type" varchar NOT NULL,
	"category" varchar NOT NULL,
	"language" varchar NOT NULL,
	"date" date NOT NULL,
	"author" text NOT NULL,
	"views" integer DEFAULT 0,
	"downloads" integer DEFAULT 0,
	"tags" jsonb,
	"featured" boolean DEFAULT false,
	"file_size" varchar,
	"download_url" text NOT NULL,
	"preview_url" text,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL,
	CONSTRAINT "resources_slug_unique" UNIQUE("slug")
);
--> statement-breakpoint
CREATE TABLE "users" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"full_name" text,
	"phone" text,
	"email" text NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL,
	CONSTRAINT "users_email_unique" UNIQUE("email")
);
--> statement-breakpoint
CREATE TABLE "videos" (
	"id" integer PRIMARY KEY NOT NULL,
	"title" text NOT NULL,
	"description" text NOT NULL,
	"category" varchar NOT NULL,
	"date" date NOT NULL,
	"duration" varchar NOT NULL,
	"youtube_id" varchar NOT NULL,
	"author" text NOT NULL,
	"views" integer DEFAULT 0,
	"featured" boolean DEFAULT false,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "what_we_do_categories" (
	"id" varchar PRIMARY KEY NOT NULL,
	"name" varchar NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "what_we_do_projects" (
	"id" integer PRIMARY KEY NOT NULL,
	"title" text NOT NULL,
	"category" varchar NOT NULL,
	"image" text NOT NULL,
	"description" text NOT NULL,
	"location" text NOT NULL,
	"date" varchar NOT NULL,
	"participants" text NOT NULL,
	"impact" text NOT NULL,
	"link" text NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL
);
