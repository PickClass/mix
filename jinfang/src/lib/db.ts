"use server";
import fs from "fs";
import path from "path";
import sqlite3 from "sqlite3";

// 确保数据目录存在
const dbPath = path.resolve(process.cwd(), "data", "db.sqlite");
const dataDir = path.dirname(dbPath);
if (!fs.existsSync(dataDir)) {
	fs.mkdirSync(dataDir, { recursive: true });
}

// 创建数据库连接
const db = new sqlite3.Database(dbPath, (err: Error | null) => {
	if (err) {
		console.error("数据库连接错误:", err.message);
	} else {
		console.log("成功连接到SQLite数据库");
	}
});

// 初始化数据库的Promise
const initDB = new Promise((resolve, reject) => {
	// 创建posts表
	db.run(
		`
    CREATE TABLE IF NOT EXISTS posts (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      title TEXT NOT NULL,
      content TEXT NOT NULL,
      createdAt DATETIME DEFAULT CURRENT_TIMESTAMP
    )
  `,
		(err: Error | null) => {
			if (err) {
				console.error("创建表错误:", err.message);
				reject(err);
				return;
			}
			console.log("posts表已准备就绪");

			// 检查并插入示例数据
			db.get(
				"SELECT COUNT(*) AS count FROM posts",
				(err: Error | null, row: { count: number }) => {
					if (err) {
						console.error("检查posts表错误:", err.message);
						reject(err);
						return;
					}

					if (row.count === 0) {
						const samplePosts = [
							{ title: "第一篇文章", content: "这是我的第一篇博客文章内容。" },
							{
								title: "第二篇文章",
								content: "这是我的第二篇博客文章内容，包含更多详细信息。",
							},
						];

						const stmt = db.prepare(
							"INSERT INTO posts (title, content) VALUES (?, ?)",
						);
						let completed = 0;

						samplePosts.forEach((post) => {
							stmt.run(post.title, post.content, (err: Error | null) => {
								if (err) {
									console.error("插入示例数据错误:", err.message);
									reject(err);
								} else {
									completed++;
									if (completed === samplePosts.length) {
										stmt.finalize();
										console.log("已插入示例文章数据");
										resolve(true);
									}
								}
							});
						});
					} else {
						resolve(true);
					}
				},
			);
		},
	);
});

// 获取所有文章的函数
export async function getPosts(): Promise<
	Array<{
		id: number;
		title: string;
		content: string;
		createdAt: string;
	}>
> {
	// 等待数据库初始化完成
	await initDB;

	return new Promise((resolve, reject) => {
		db.all(
			"SELECT * FROM posts ORDER BY createdAt DESC",
			(
				err: Error | null,
				rows: Array<{
					id: number;
					title: string;
					content: string;
					createdAt: string;
				}>,
			) => {
				if (err) reject(err);
				else resolve(rows);
			},
		);
	});
}

export async function addPost(title: string, content: string) {
	await initDB;
	return new Promise((resolve, reject) => {
		db.run(
			"INSERT INTO posts (title, content, createdAt) VALUES (?, ?, ?)",
			[title, content, new Date().toISOString()],
			(err: Error | null) => {
				if (err) reject(err);
				else resolve(true);
			},
		);
	});
}
