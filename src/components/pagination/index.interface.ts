
/**
 * pagination.state 参数类型
 *
 * @export
 * @interface PaginationState
 */
export interface PaginationState {}

/**
 * pagination.props 参数类型
 *
 * @export
 * @interface PaginationProps
 */
export interface PaginationProps {
  onRefresh?: () => void, // 下拉刷新的回调
  disablePullDown?: boolean, // 禁止下拉
  pullDownText?: string, // 下拉文字显示
  pullingDownText?: string,// 下拉可触发事件文字显示
  refreshLoading?: boolean, // 下拉加载状态
  endReachedError?: boolean, // 下拉加载发生错误
  showRefreshPromp?: boolean, // 下拉刷新确认提示
  refreshPrompText?: string // 下拉刷新确认提示内容
  onEndReached?: () => void, // 上拉加载回调
  endReachedLoading?: boolean, // 上拉加载状态
  showNoMoreData?: boolean, // 是否显示无更多数据
  height?: string | number | Array<string | number>, // 高度 数字(100)或者字符串('100px')
  showToastLoading?: boolean, // 是否显示toast loading
  showCoverLoading?: boolean, // 是否封面loading效果
  showCoverInfo?: boolean, // 是否显示封面提示信息
  coverInfoText?: string, // 封面提示信息文本内容
  showScrollToTop?: boolean, // 是否显示置顶
  [propsName:string]:any
}

export interface DargStyleConfig{
  top ?: string,
  height?: string | number | Array<string | number>,
  [propsName:string]:any
}

export interface DownDragStyleConfig{
  display ?: string,
  height?: string | number | Array<string | number>,
  [propsName:string]:any

}
