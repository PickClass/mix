// 数据库操作
import Db from '@/plugin/Db'
import { eq } from 'drizzle-orm'
import { admin, Admin } from '@/schema/admin'
import type { QuerySign } from './login.dto'

export const findUser = async (query: QuerySign): Promise<Admin | undefined> => {
  const admin_info = await Db.query.admin.findFirst({
    where: eq(admin.account, query.account),
  })
  return admin_info
}
