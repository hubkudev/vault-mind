CREATE TABLE `knowledges` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`type` text(50) NOT NULL,
	`name` text,
	`desc` text,
	`embedding` blob NOT NULL,
	`project_id` text NOT NULL,
	`created_at` text DEFAULT (current_timestamp) NOT NULL,
	FOREIGN KEY (`project_id`) REFERENCES `projects`(`id`) ON UPDATE no action ON DELETE cascade
);
--> statement-breakpoint
CREATE TABLE `projects` (
	`id` text PRIMARY KEY NOT NULL,
	`name` text NOT NULL,
	`desc` text,
	`banner_url` text,
	`created_at` text DEFAULT (current_timestamp) NOT NULL
);
