import Taro from '@tarojs/taro'



// 是否是h5环境
export const IS_H5 = Taro.getEnv() === Taro.ENV_TYPE.WEB
// 是否是微信小程序环境
export const IS_WEAPP = Taro.getEnv() === Taro.ENV_TYPE.WEAPP

/**
 * 显示确认提示框
 * @param {object} parmas
 * 
 * isShowPromp 是否显示确认提示，为false则执行确认点击回调 
 * tip 提示信息 
 * callback 确认点击回调  
 * cancelCallback 取消确认点击回调 
 */
export function showPromp({ isShowPromp, tip, callback, cancelCallback }) {
  if (isShowPromp) {
    Taro.showModal({
      content: tip
    })
      .then(({ confirm, cancel }) => {
        if (confirm) {
          callback && callback()
        } else if (cancel) {
          cancelCallback && cancelCallback()
        }
      })
  } else {
    callback && callback()
  }
}









