import { db } from "~/server/db"
import { sql } from 'drizzle-orm'

export async function GET() {
    // const post = await db.query.posts.findMany();
    const article = await db.query.article.findMany();
   

    return Response.json(article)
}