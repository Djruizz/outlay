CREATE TABLE `users` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`name` text NOT NULL,
	`email` text NOT NULL,
	`created_at` integer DEFAULT '"2026-08-14T05:46:48.698Z"',
	`updated_at` integer DEFAULT '"2026-08-14T05:46:48.698Z"'
);
