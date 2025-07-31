# Elysia with Bun runtime

## Getting Started

To get started with this template, simply paste this command into your terminal:

```bash
bun create elysia ./elysia-example
```

## Development

To start the development server run:

```bash
bun run dev
```

Open <http://localhost:3000/> with your browser to see the result.

计划通
  实现blog功能  一个完整的cms 系统

  1. 使用elysia 实现无头和带头的cms
  2. 使用solid ssr + elysia 实现srr
  3. 前端 + 后端
  4. 前端展示页面 使用模板渲染 或者使用solid ssr
  5. 后台管理使用solid  

``` text

 目录设计 模块分层  使用清晰架构
    src/
    ├── domain/                # 领域层（核心业务逻辑）
    │   ├── entities/          # 领域实体（如User、Order）
    │   ├── interfaces/        # 领域接口（如仓储接口、服务接口）
    │   └── services/          # 领域服务（复杂业务逻辑）
    │
    ├── application/           # 应用层（用例编排）
    │   ├── use-cases/         # 业务用例（如CreateUserUseCase）
    │   └── dto/               # 数据传输对象（请求/响应格式）
    │
    ├── interface/             # 接口层（外部交互）
    │   ├── controllers/       # HTTP控制器（处理请求/响应）
    │   ├── middlewares/       # 中间件（认证、日志等）
    │   └── routes/            # 路由定义
    │
    ├── infrastructure/        # 基础设施层（技术实现）
    │   ├── adapters/          # 适配器（如数据库、第三方服务）
    │   ├── config/            # 配置文件（环境变量、数据库连接）
    │   └── utilities/         # 工具函数（加密、文件处理等）
    │
    ├── shared/                # 共享模块（跨层公用）
    │   ├── errors/            # 自定义异常
    │   ├── constants/         # 常量
    │   └── types/             # 全局类型定义
    │
    └── main.ts                 # 应用入口（依赖组装、启动服务）
接口层-》
    应用层 调用领域服务 进行业务逻辑处理-》调用领域仓储执行数据库操作
```

``` test
                          ┌───────────┐
                          │ 接口层     │ （外部交互，如API、UI）
                          └───────────┘
                                ▼ 依赖
                          ┌───────────┐
                          │ 应用层     │ （用例逻辑）
                          └───────────┘
                                ▼ 依赖
                          ┌───────────┐
                          │ 领域层     │ （核心业务逻辑）
                          └───────────┘
                                ▲ 依赖反转
                          ┌───────────┐
                          │ 基础设施层 │ （技术实现，如数据库、消息队列）
                          └───────────┘

                          ┌───────────┐
                          │ 共享模块   │ （跨层公用工具、常量等）
                          └───────────┘
                                ▲ 被各层依赖
```

领域层
    领域实体（Entities）
    领域服务（Services）
    领域仓储（Repositories）

modules/
    ├── user/                  # 用户模块
    │   ├── entities/          # 用户实体
    │   ├── services/          # 用户服务
    │   └── repositories/      # 用户仓储
    │
    ├── order/                 # 订单模块
    │   ├── entities/          # 订单实体
    │   ├── services/          # 订单服务
    │   └── repositories/      # 订单仓储
    │
    └── payment/               # 支付模块
        ├── entities/          # 支付实体
        ├── services/          # 支付服务
        └── repositories/      # 支付仓储

模块化开发
    src/
    ├── modules/
    │   ├── user/              # 用户模块
    │   │   ├── entities/      # 用户实体
    │   │   ├── services/      # 用户服务
    │   │   └── repositories/  # 用户仓储
    │   │
    │   ├── order/             # 订单模块
    │   │   ├── entities/      # 订单实体
    │   │   ├── services/      # 订单服务
    │   │   └── repositories/  # 订单仓储
    │   │
