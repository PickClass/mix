import { Elysia } from 'elysia'
import { loginRoutes } from './login/login.routes'
import { listRoutes } from './list/routes'
import { guard } from './guard'

export const main = new Elysia().use(guard).use(loginRoutes).use(listRoutes).as('scoped')

export default main
