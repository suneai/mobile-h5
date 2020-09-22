import index from '../pages/index/config'

/** 
 * 请求的公共参数
 */
export const conmomPramas = {}

/**
 * 请求映射文件
 */
export const requestConfig = {
  loginUrl: '/api/user/wechat-auth', // 微信登录接口
  ...index
}