import {
  integer,
  pgTable,
  smallint,
  varchar,
  serial,
  timestamp,
  pgSequence,
} from 'drizzle-orm/pg-core'

export const customSequence = pgSequence('yj_admin_id')

export const admin = pgTable('yj_admin', {
  id: serial('id').primaryKey(), // 自增主键，无需显式notNull()
  // 管理员账号
  root: smallint().notNull().default(0),
  name: varchar('name', { length: 32 }).notNull(),
  avatar: varchar('avatar', { length: 255 }).notNull(),
  account: varchar('account', { length: 32 }).unique().notNull(),
  password: varchar('password', { length: 255 }).notNull(), // 增加长度以适应现代哈希
  // 登录时间
  login_time: integer(),
  // 登录ip
  login_ip: varchar('login_ip', { length: 32 }),
  // 是否允许多点登录
  multipoint_login: smallint().default(1), // 使用boolean代替smallint
  // 是否禁用
  disabled: smallint().notNull().default(0), // 使用boolean代替smallint
  // 创建时间
  create_time: timestamp('create_time').defaultNow().notNull(), // 使用timestamp
  // 更新时间
  update_time: timestamp('update_time').defaultNow().notNull(), // 使用timestamp
  // 删除时间
  delete_time: timestamp('delete_time'), // 使用timestamp
})

export type Admin = typeof admin.$inferSelect

export const admin_token = pgTable('yj_admin_token', {
  id: integer().primaryKey().notNull(),
  admin_id: integer().notNull().unique(),
  token: varchar({ length: 255 }).notNull().unique(),
  expire_time: integer().notNull(),
  update_time: integer(),
})
