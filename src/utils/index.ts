import Taro from '@tarojs/taro'



// 是否是h5环境
export const IS_H5 = Taro.getEnv() === Taro.ENV_TYPE.WEB
// 是否是微信小程序环境
export const IS_WEAPP = Taro.getEnv() === Taro.ENV_TYPE.WEAPP




// 固定高度的组件列表及对应高度
export const HEIGHTS = {
  navBarHeight: '46.14px', // 导航栏高度(使用getScrollHeight方法可以不用传该属性)
  tabBarWithIconHeight: '65px', // 有图标tabbar
  tabBarWithoutIconHeight: '36px', // 无图标tabbar
  searchBarHeight: '42px'// 搜索栏高度
}

/**
 * 获取可用的滚动高度，在h5页面会默认减去导航栏的高度，传入withNavBar=false可以避免
 * 
 * 例如 getScrollHeight(['navBarHeight','tabBarWithoutIconHeight',100])
 * 
 * @export
 * @param {array} heights 页面上已使用的高度集合，可以是纯数字集合
 * @param {boolean} [withNavBar=true] 不包含导航栏
 * @param {boolean} [withNativeTabBar=false] 是否包含Taro自带的tabBar
 * @returns 最终的高度值
 */
export function getScrollHeight(heights, withNavBar = true, withNativeTabBar = false) {
  let heightStr = '0px'
  let allHeight = withNativeTabBar ? '100%' : '100vh'
  if (IS_H5 && withNavBar) {
    heightStr = HEIGHTS.navBarHeight
  }
  if (!Array.isArray(heights)) {
    throw new Error('请传入一个数组,属性是当前方法文件中HEIGHTS对象的属性名或者纯数字的组合')
  }
  heights.forEach((item) => {
    let currentHeight
    switch (typeof item) {
      case 'string':
        currentHeight = HEIGHTS[item]
        break
      case 'number':
        currentHeight = item + 'px'
        break
    }
    if (!currentHeight) {
      new Error('传入的数组属性必须是当前方法文件中HEIGHTS对象的属性名或者纯数字的组合')
    }
    heightStr = `calc(${heightStr} + ${currentHeight})`
  })

  return `calc(${allHeight} - ${heightStr})`
}




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









