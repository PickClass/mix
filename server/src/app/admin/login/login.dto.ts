// auth.model.ts  类型数据效验
import { t, Static } from 'elysia'

export const LoginQuerySchema = t.Object({
  account: t.String(),
  password: t.String({
    maxLength: 16,
    minLength: 5,
    error() {
      return '密码长度不能超过16个字符'
    },
    description: '密码',
  }),
})

export type QuerySign = Static<typeof LoginQuerySchema>

export const LoginResponse = t.Object({
  token: t.String(),
})

export const registerQuerySchema = t.Object({
  account: t.String(),
  password: t.String({
    maxLength: 16,
    minLength: 6,
    error() {
      return '密码长度不能超过16个字符'
    },
    description: '密码',
  }),
})
