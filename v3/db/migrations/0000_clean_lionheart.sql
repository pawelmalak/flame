CREATE TABLE `global_config` (
	`id` integer PRIMARY KEY NOT NULL,
	`config_json` text DEFAULT '{}' NOT NULL,
	`updated_at` integer NOT NULL
);
