import type { RouterConfig } from "@nuxt/schema"
import type { RouteMeta, RouteRecordRaw } from "vue-router"

// 处理包含 /frontend 的路由
const handleFrontendRoute = (route: RouteRecordRaw) => {
  route.path = route.path.replace("/frontend", "")
  if (route.path === "") {
    route.path = "/"
  }
  route.meta = {
    ...route.meta,
    layout: "frontend"
  }
}

// 处理包含 /login 的路由
const handleLoginRoute = (route: RouteRecordRaw) => {
  route.meta = {
    ...route.meta,
    layout: "empty"
  }
}

// 处理其他路由，使用更明确的类型注解，避免潜在的类型错误
const handleOtherRoute = (route: RouteRecordRaw) => {
  // 合并原有的 meta 信息，并设置默认布局为 admin
  route.meta = {
    ...(route.meta || {}),
    layout: "admin"
  }
}

export default {
  // https://router.vuejs.ac.cn/api/interfaces/routeroptions.html#routes
  routes: _routes => {
    // 循环遍历路由表，修改路由路径
    _routes.forEach(route => {
      if (route.path.includes("/frontend")) {
        handleFrontendRoute(route)
      } else {
        handleOtherRoute(route)
      }
      if (route.path.includes("/login")) {
        handleLoginRoute(route)
      }
    })
    return _routes // 返回修改后的路由表
  }
} satisfies RouterConfig
