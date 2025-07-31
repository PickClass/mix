import { Admin } from '@/schema/admin'
import { QuerySign } from './login.dto'
import { findUser } from './login.repository'
import { CustomError } from '@/utils/response'

// 处理业务 逻辑和异常处理 事务控制 处理数据

/**任何可以从控制器中解耦的技术逻辑都可以存在于一个 服务 中。

Elysia 中有两种类型的服务：

非请求依赖的服务 
请求依赖的服务

如果需要使用请求服务内的属性 使用Elysia 实例作为服务使用

服务方法命名
规则：动词 + 业务逻辑
**/

export const validateUser = async (query: QuerySign): Promise<Admin> => {
  const adminInfo = await findUser(query)

  if (!adminInfo) {
    throw new CustomError('账户不存在')
  }

  const isPasswordValid = await Bun.password.verify(query.password, adminInfo.password)
  if (!isPasswordValid) {
    throw new CustomError('密码错误')
  }

  return adminInfo
}

export const JWT = async () => {}
