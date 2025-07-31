import { sqliteTable,  integer, text, numeric, blob, primaryKey } from "drizzle-orm/sqlite-core"
  import { sql } from "drizzle-orm"

export const article = sqliteTable("article", {
	id: integer().primaryKey({ autoIncrement: true }),
	status: integer(),
	type: integer(),
	num: integer(),
	pnum: integer(),
	isList: integer(),
	text: text(),
	style: text(),
	ppnum: text(),
	fang: text(),
	text1: text(),
	isSong: text(),
	snum: text("Snum"),
});

export const formula = sqliteTable("formula", {
	id: integer().primaryKey({ autoIncrement: true }),
	status: integer(),
	letter: text(),
	name: text(),
	list: text(),
	fa: text(),
	zhu: text(),
	hname: text("Hname"),
});

export const zhongyao = sqliteTable("zhongyao", {
	id: integer().primaryKey(),
	title: text(),
	content: text(),
	parentId: integer(),
	h1: integer(),
	children: text(),
	classifyId: integer(),
	h2: integer(),
});

export const searchFts = sqliteTable("search_fts", {
	source: numeric(),
	sourceId: numeric("source_id"),
	text: numeric(),
	searchFts: numeric("search_fts"),
	rank: numeric(),
});

export const searchFtsData = sqliteTable("search_fts_data", {
	id: integer().primaryKey(),
	block: blob(),
});

export const searchFtsIdx = sqliteTable("search_fts_idx", {
	segid: numeric().notNull(),
	term: numeric().notNull(),
	pgno: numeric(),
},
(table) => [
	primaryKey({ columns: [table.segid, table.term], name: "search_fts_idx_segid_term_pk"})
]);

export const searchFtsContent = sqliteTable("search_fts_content", {
	id: integer().primaryKey(),
	c0: numeric(),
	c1: numeric(),
	c2: numeric(),
});

export const searchFtsDocsize = sqliteTable("search_fts_docsize", {
	id: integer().primaryKey(),
	sz: blob(),
});

export const searchFtsConfig = sqliteTable("search_fts_config", {
	k: numeric().primaryKey().notNull(),
	v: numeric(),
});

