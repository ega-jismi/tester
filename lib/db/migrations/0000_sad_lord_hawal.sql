CREATE TABLE `articles` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`title` text NOT NULL,
	`excerpt` text,
	`category` text,
	`date` text,
	`image` text,
	`content` text
);
--> statement-breakpoint
CREATE TABLE `books` (
	`id` text PRIMARY KEY NOT NULL,
	`title` text NOT NULL,
	`author` text NOT NULL,
	`price` integer NOT NULL,
	`discount` integer DEFAULT 0,
	`cover` text,
	`tags` text,
	`description` text,
	`isbn` text,
	`publisher` text,
	`pages` integer,
	`weight` real,
	`created_at` integer DEFAULT (unixepoch())
);
--> statement-breakpoint
CREATE TABLE `reviews` (
	`id` text PRIMARY KEY NOT NULL,
	`book_id` text NOT NULL,
	`user` text NOT NULL,
	`rating` integer NOT NULL,
	`text` text,
	`created_at` integer DEFAULT (unixepoch()),
	FOREIGN KEY (`book_id`) REFERENCES `books`(`id`) ON UPDATE no action ON DELETE cascade
);
