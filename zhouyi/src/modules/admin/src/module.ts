import { defineNuxtModule, addServerHandler, createResolver } from "@nuxt/kit"

export default defineNuxtModule({
  meta: {
    name: "my-module",
    configKey: "myModule"
  },
  setup(options, nuxt) {
    const resolver = createResolver(import.meta.url)

    addServerHandler({
      route: "/api/hellos",
      handler: resolver.resolve("./runtime/server/api/api-route")
    })
  }
})
