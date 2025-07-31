/**
 * 
 * 
 * 方案三：同时使用 HttpStatusCode + 自定义错误码【推荐】
    响应体里包含：自定义码值、信息、数据

    HTTP/1.1 405 Method Not Allowed
    Content-Type: application/json

    {
        "code": 405001
        "message": "xxxxx"
        "result": {
            "id": 1
            ...
        }
    }
 * 
 */

export class CustomError<T = unknown> extends Error {
  // 可选：自定义 HTTP 状态码
  status: number = 500
  // 附加信息，类型由泛型 T 决定
  details?: T

  constructor(
    public message: string,
    status: number = 500,
    details?: T,
  ) {
    super(message)
    this.status = status
    this.details = details
  }

  // 可选：发送到客户端的内容
  toResponse() {
    return {
      code: this.status,
      message: this.message ?? '发生错误',
      error: this.details || null,
    }
  }
}

export type ApiResponse<T> = {
  code: number // 自定义状态码
  message: string // 返回消息
  data?: T // 成功时返回的数据
  error?: {
    details?: any // 错误时的附加信息
  }
}

// 成功响应
export const success = <T>(
  data: T,
  code: number = 0,
  message: string = '操作成功',
): ApiResponse<T> => ({
  code,
  message,
  data,
})

// 错误响应
export const fail = <T>(
  code: number = 500,
  message: string = '服务器错误',
  details?: T,
): ApiResponse<T> => ({
  code,
  message,
  error: {
    details, // 错误时的附加信息
  },
})
// 处理其他未知错误
