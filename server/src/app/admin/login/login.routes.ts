import { Elysia } from 'elysia'
import { LoginQuerySchema } from './login.dto'
import jwt from '@/plugin/jwt'
import { loginUser, logoutUser } from './login.controller'

// 使用 ElysiaApp 类型
// export default (app: admin) => app.get('/test', (r) => r.Db)

// 考虑问提 参数验证 和 数据库操作问题 以及 路由鉴权
export const loginRoutes = new Elysia()
  .use(jwt)
  .guard({
    // 鉴权守卫
    noSignIn: ['login', 'register'],
  })
  .post('/login', loginUser, { query: LoginQuerySchema })
  .post('/logout', logoutUser)

export type loginRoutes = typeof loginRoutes
