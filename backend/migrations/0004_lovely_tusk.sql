ALTER TABLE `knowledges` RENAME COLUMN "project_id" TO "vault_id";--> statement-breakpoint
ALTER TABLE `knowledges` ALTER COLUMN "vault_id" TO "vault_id" text NOT NULL REFERENCES vaults(id) ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `knowledges` DROP COLUMN `name`;--> statement-breakpoint
ALTER TABLE `knowledges` DROP COLUMN `desc`;