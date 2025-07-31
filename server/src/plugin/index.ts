import { Elysia } from 'elysia'
import { swagger } from '@elysiajs/swagger'
import 'dotenv/config'
import jwtPlugin from './jwt'

export const plugin = new Elysia().use(swagger()).use(jwtPlugin)
