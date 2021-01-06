
/**
 * pagetopnavbar.state 参数类型
 *
 * @export
 * @interface PageTopNavBarState
 */
export interface PageTopNavBarState { }

/**
 * pagetopnavbar.props 参数类型
 *
 * @export
 * @interface PageTopNavBarProps
 */
export interface PageTopNavBarProps {
  navTitle?: string, // 导航栏标题
  showNavBar?: boolean, // 是否需要导航栏
  onLeftClick?: () => void, // 左边按钮的点击方法,默认返回上一页
  hiddenLeft?: boolean, // 隐藏左边按钮
  showCoverLoading?: boolean, // 显示封面loading效果
  hiddenRight?: boolean, // 隐藏右边按钮
  onRightClick?: () => void, // 右边按钮的点击方法
  showLeftClickPromp?: boolean, // 左边按钮点击确认提示
  leftClickPrompText?: string,
  color?: string,//导航栏颜色
  menus?: Array<any>,//右侧按钮的菜单
  [propsName: string]: any
}
