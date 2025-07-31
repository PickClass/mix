import { Elysia, t } from 'elysia'
import 'dotenv/config'
import admin from '@/app/admin/index'
import { swagger } from '@elysiajs/swagger'
import { opentelemetry } from '@elysiajs/opentelemetry'
import { CustomError, fail } from '@/utils/response'
import { staticPlugin } from '@elysiajs/static'
import { renderToString } from "solid-js/web";
import App from './App'

// 由于报错信息显示类型不兼容，尝试不指定类型注解，让 TypeScript 自动推断类型
export const app = new Elysia()
 
  .use(opentelemetry())
  .use(swagger())
  .error({
    CUSTOM: CustomError,
  })
  .onError(({ code, error, set }) => {
    if (code === 'NOT_FOUND') return 'Not Found :('
    if (code === 'CUSTOM') {
      // 如果是自定义错误，返回自定义的响应内容
      return error.toResponse()
    }
    if (error instanceof Error) {
      set.status = 500

      return fail(500, error.message)
    }
    return new Response(error.toString())
  })
  .use(admin)
  .get("/app", ({ set }) => {
    set.headers["Content-Type"] = "text/html; charset=utf-8";
    const html = renderToString(() => <App />);
    return `<!DOCTYPE html>
  <html>
    <head>
      <meta charset="utf-8" />
      <title>Solid SSR + Elysia</title>
    </head>
    <body>
      <div id="app">${html}</div>
      <script type="module" src="/client.js"></script>
    </body>
  </html>`;
  })
  .use(staticPlugin(
    {
      assets: './public',
      prefix: 'public',
    }
  ))
  .listen(3000)

console.log(`🦊 Elysia is running at ${app.server?.hostname}:${app.server?.port}`)
