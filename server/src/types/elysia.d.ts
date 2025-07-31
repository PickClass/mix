import type { Elysia, InferContext } from 'elysia'
import { plugin } from '@/plugin'
import { adminContext } from '@/app/admin'

declare global {
  type ElysiaApp = typeof plugin
  type Context = InferContext<typeof plugin>
  type PublicContext<T> = Context & T
}
// function createApp({}:PublicContext<adminContext>) {

// }
