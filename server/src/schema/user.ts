import { integer, pgTable, varchar, timestamp } from 'drizzle-orm/pg-core'
/**
 * 存储系统用户的基本信息
 */
export const users = pgTable('yj_users', {
  /**
   * 用户的唯一标识符
   */
  id: integer().primaryKey().generatedAlwaysAsIdentity(),
  /**
   * 用户的用户名，必须唯一
   */
  username: varchar('username', { length: 50 }).notNull().unique(),
  /**
   * 用户的密码
   */
  password: varchar('password', { length: 255 }).notNull(),
  /**
   * 用户的邮箱，必须唯一
   */
  email: varchar({ length: 255 }).notNull().unique(),
  /**
   * 用户创建时间
   */
  createdAt: timestamp().defaultNow().notNull(),
  /**
   * 用户信息最后更新时间
   */
  updatedAt: timestamp().notNull(),
})
