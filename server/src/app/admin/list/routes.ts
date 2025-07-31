import { Elysia, t } from 'elysia'
import { guard } from '../guard'
// 使用 ElysiaApp 类型
// export default (app: admin) => app.get('/test', (r) => r.Db)

// 考虑问提 参数验证 和 数据库操作问题 以及 路由鉴权
export const listRoutes = new Elysia()
  .use(guard)
  .guard({
    noSignIn: [],
  })
  .post('list', () => {
    return 'list'
  })
