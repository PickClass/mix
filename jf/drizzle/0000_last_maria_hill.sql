-- Current sql file was generated after introspecting the database
-- If you want to run this migration please uncomment this code before executing migrations
/*
CREATE TABLE `article` (
	`id` integer PRIMARY KEY AUTOINCREMENT,
	`status` integer,
	`type` integer,
	`num` integer,
	`pnum` integer,
	`isList` integer,
	`text` text,
	`style` text,
	`ppnum` text,
	`fang` text,
	`text1` text,
	`isSong` text,
	`Snum` text
);
--> statement-breakpoint
CREATE TABLE `formula` (
	`id` integer PRIMARY KEY AUTOINCREMENT,
	`status` integer,
	`letter` text,
	`name` text,
	`list` text,
	`fa` text,
	`zhu` text,
	`Hname` text
);
--> statement-breakpoint
CREATE TABLE `zhongyao` (
	`id` integer PRIMARY KEY,
	`title` text,
	`content` text,
	`parentId` integer,
	`h1` integer,
	`children` text,
	`classifyId` integer,
	`h2` integer
);
--> statement-breakpoint
CREATE TABLE `search_fts` (
	`source` numeric,
	`source_id` numeric,
	`text` numeric,
	`search_fts` numeric,
	`rank` numeric
);
--> statement-breakpoint
CREATE TABLE `search_fts_data` (
	`id` integer PRIMARY KEY,
	`block` blob
);
--> statement-breakpoint
CREATE TABLE `search_fts_idx` (
	`segid` numeric NOT NULL,
	`term` numeric NOT NULL,
	`pgno` numeric,
	PRIMARY KEY(`segid`, `term`)
);
--> statement-breakpoint
CREATE TABLE `search_fts_content` (
	`id` integer PRIMARY KEY,
	`c0` numeric,
	`c1` numeric,
	`c2` numeric
);
--> statement-breakpoint
CREATE TABLE `search_fts_docsize` (
	`id` integer PRIMARY KEY,
	`sz` blob
);
--> statement-breakpoint
CREATE TABLE `search_fts_config` (
	`k` numeric PRIMARY KEY NOT NULL,
	`v` numeric
);

*/