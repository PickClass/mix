import type { QuerySign } from './login.dto'
import { validateUser } from './login.service'
import type { loginRoutes } from './login.routes'
import { type InferContext, RouteSchema } from 'elysia'

import { success } from '@/utils/response'
// 使用 ElysiaApp 类型
// export default (app: admin) => app.get('/test', (r) => r.Db)
/**
 *控制器方法命名
规则：动词 + 资源名称 
 */

type LoginRouteContext<T extends RouteSchema> = InferContext<loginRoutes, '/login', T>
type logs = {
  query: QuerySign
}

// 考虑问提 参数验证 和 数据库操作问题 以及 路由鉴权
export async function loginUser({ query, jwt, cookie: { auth } }: LoginRouteContext<logs>) {
  const admin_info = await validateUser(query)
  const toekn = await jwt.sign({ id: admin_info.id })
  auth.set({
    value: toekn,
    httpOnly: true,
    maxAge: 7 * 86400,
    path: '/',
  })

  return success({ toekn })
}

export async function logoutUser({ cookie: { auth } }: LoginRouteContext<logs>): Promise<string> {
  // 清除cookie
  auth.remove()
  return '退出成功'
}
