import { Elysia } from 'elysia'

import 'dotenv/config'
import { jwt } from '@elysiajs/jwt'

export default new Elysia().use(
  jwt({
    name: 'jwt',
    secret: process.env.JWT_SECRETS!,
    exp: '1m',
  }),
)
