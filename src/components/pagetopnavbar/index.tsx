
import React, { useEffect, useMemo, useCallback } from 'react'
import { View } from '@tarojs/components'
import Taro from '@tarojs/taro'
import { PageTopNavBarProps } from './index.interface'
import { IS_H5, IS_WEAPP, routerToHome, HEIGHTS, showPromp } from '@utils/index'
import { AtNavBar, AtActivityIndicator, AtMessage } from 'taro-ui'
import './index.scss'

const PageTopNavBar = (props: PageTopNavBarProps) => {
  const {
    navTitle = '', // 导航栏标题
    showNavBar = true, // 是否需要导航栏
    onLeftClick = null, // 左边按钮的点击方法,默认返回上一页
    hiddenLeft = false, // 隐藏左边按钮
    showCoverLoading = false, // 显示封面loading效果
    hiddenRight = false, // 隐藏右边按钮
    onRightClick = null, // 右边按钮的点击方法
    showLeftClickPromp = false, // 左边按钮点击确认提示
    leftClickPrompText = '修改内容未保存，是否要放弃修改？',
    color = '#457d37',//导航栏颜色
    menus = [
      { title: '回到首页', callback: routerToHome }
    ],//右侧按钮的菜单
    children,
    ...nextProps
  } = props

  // 改变小程序标题
  useEffect(() => {
    IS_WEAPP && navTitle && Taro.setNavigationBarTitle({ title: navTitle })
  }, [navTitle])

  //显示navbar
  const _showNavBar = useMemo(() => IS_H5 && showNavBar, [showNavBar])
  //容器高度
  const contentHeight = useMemo(() => _showNavBar ? `calc(100% - ${HEIGHTS.navBarHeight})` : '100%', [_showNavBar])
  //左边的文本
  const leftText = useMemo(() => hiddenLeft ? '' : '返回', [])
  //左边的icon
  const leftIconType = useMemo(() => hiddenLeft ? '' : 'chevron-left', [])
  //右边的icon
  const rightIconType = useMemo(() => hiddenRight ? '' : 'menu', [])



  const onLeftClickImpl = useCallback(() => {
    if (onLeftClick) {
      onLeftClick && onLeftClick()
    } else {
      Taro.navigateBack()
    }
  }, [onLeftClick])

  // 左边按钮点击
  const onLeftClickHandle = useCallback(() => {
    if (hiddenLeft) return
    showPromp({
      isShowPromp: showLeftClickPromp,
      tip: leftClickPrompText,
      callback: onLeftClickImpl
    })
  }, [])

  // 右边按钮点击
  const onRightClickHandle = useCallback(() => {
    if (hiddenRight) return
    Taro.showActionSheet({ itemList: menus.map(item => item.title) }).then(({ tapIndex }) => {
      let func = menus[tapIndex]['callback']
      func && func()
    })
  }, [hiddenRight])


  return (
    <View className='page-top-nav-bar-wrap'>
      <AtMessage />
      {_showNavBar && <AtNavBar
        onClickLeftIcon={onLeftClickHandle}
        leftIconType={leftIconType}
        color={color}
        title={navTitle}
        leftText={leftText}
        rightFirstIconType={rightIconType}
        onClickRgIconSt={onRightClickHandle}
      />}
      {!showCoverLoading && <View style={`height:${contentHeight};overflow:hidden;`}>{children}</View>}
      {showCoverLoading && <AtActivityIndicator mode='center' size={100} />}
    </View>
  )
}

export default PageTopNavBar
