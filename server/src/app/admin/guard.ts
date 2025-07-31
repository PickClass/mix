import Elysia from 'elysia'
import jwt from '@/plugin/jwt'
import { CustomError } from '@/utils/response'

// 使用宏
export const guard = new Elysia()
  .use(jwt)
  .resolve(({ headers: { authorization }, cookie: { auth } }) => {
    if (authorization?.startsWith('Bearer ') || auth.value) {
      return {
        token: authorization?.split(' ')[1] || auth.value,
      }
    }
  })
  .macro({
    noSignIn(noNeedAuth: string[]) {
      return {
        async beforeHandle({ token, route, jwt }) {
          const res = await jwt.verify(token)
          if (noNeedAuth.includes(route.substring(1))) {
            console.log(route)
          } else {
            if (!token || !res) {
              throw new CustomError('请先登录', 401)
            }
          }
        },
      }
    },
    toekn() {},
  })
  .as('scoped')
