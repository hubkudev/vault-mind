ALTER TABLE `projects` RENAME TO `vaults`;--> statement-breakpoint
PRAGMA foreign_keys=OFF;--> statement-breakpoint
CREATE TABLE `__new_knowledges` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`type` text(50) NOT NULL,
	`name` text,
	`desc` text,
	`embedding` blob NOT NULL,
	`project_id` text NOT NULL,
	`created_at` text DEFAULT (current_timestamp) NOT NULL,
	FOREIGN KEY (`project_id`) REFERENCES `vaults`(`id`) ON UPDATE no action ON DELETE cascade
);
--> statement-breakpoint
INSERT INTO `__new_knowledges`("id", "type", "name", "desc", "embedding", "project_id", "created_at") SELECT "id", "type", "name", "desc", "embedding", "project_id", "created_at" FROM `knowledges`;--> statement-breakpoint
DROP TABLE `knowledges`;--> statement-breakpoint
ALTER TABLE `__new_knowledges` RENAME TO `knowledges`;--> statement-breakpoint
PRAGMA foreign_keys=ON;