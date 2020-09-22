
import React, { useState, useCallback } from 'react'
import { View , ScrollView } from '@tarojs/components'
import { PaginationProps, DargStyleConfig , DownDragStyleConfig } from './index.interface'
import './index.scss'

const defaultDownDragStyle = {
  height: 0 + 'px',
  display: 'none'
}

const Pagination = ( props: PaginationProps) => {
  const {
    onRefresh, // 下拉加载的回调
    onEndReached, // 上拉加载回调
    loading = false, // 加载状态
    height = 300, // 
    pullDownText = '下拉可以刷新', // 下拉文字显示
    pullingDownText = '松开立即刷新',// 下拉可触发刷新文字显示
    refreshLoading = false, // 下拉加载状态
    showToastLoading = false, // 是否显示toast loading
    showCoverLoading = false, // 是否封面加载效果
    endReachedLoading = false,// 上拉加载状态
    showNoMoreData = false, // 是否显示无更多数据
    endReachedError = false, // 下拉加载发生错误
    showCoverInfo = false, // 是否显示封面提示信息
    coverInfoText = undefined, // 封面提示信息文本内容
    showScrollToTop = true, // 是否显示置顶
    disablePullDown = false, // 禁止下拉
    showRefreshPromp = false, // 下拉刷新确认提示
    refreshPrompText = '修改内容未保存，是否要放弃修改？', // 下拉刷新确认提示内容
    ...nextProps
  } = props

  //下拉框的样式
  const [dargStyle,setDargStyle] = useState<DargStyleConfig>({
    top: 0 + 'px',
    height: typeof height === 'string' ? height : height + 'px'
  })
  //下拉图标的样式
  const [downDragStyle,setdownDragStyle] = useState<DownDragStyleConfig>(defaultDownDragStyle)
  const [pullDownTextState,setPullDownTextState] = useState<string>(pullDownText)
  const [start_p,setStart_p] = useState<any>({})
  const [scrollY,setScrollY] = useState<boolean>(true)
  //刷新状态 0不做操作 1刷新 -1加载更多
  const [dargState,setDargState] = useState<number>(0)
  // 是否可以下拉
  const [isPullDownAble,setIsPullDownAble] = useState<boolean>(true)
  // 下拉的加载状态
  const [localRefreshLoading,setLocalRefreshLoading] = useState<boolean>(false)
  // 是否显示置顶
  const [scrollToTopAble,setScrollToTopAble] = useState<boolean>(false)
  // 竖直滚动高度
  const [scrollTop,setScrollTop] = useState<number>(0)



  return (
    <View className='fx-pagination-wrap'>

    </View>
  )

}

export default Pagination
