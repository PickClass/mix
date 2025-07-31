import * as admin from '@/schema/admin'
import * as user from '@/schema/user'
import { Pool } from 'pg'
import { drizzle } from 'drizzle-orm/node-postgres'
import { Elysia } from 'elysia'

export default drizzle({
  schema: { ...admin, ...user },
  client: new Pool({
    connectionString: Bun.env.DATABASE_URL!,
  }),
})
