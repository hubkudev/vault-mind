ALTER TABLE `knowledges` ADD `user_id` text NOT NULL REFERENCES users(id);