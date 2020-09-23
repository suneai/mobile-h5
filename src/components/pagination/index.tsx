
import React, { useState, useCallback, useEffect, useRef } from 'react'
import { View, ScrollView } from '@tarojs/components'
import { PaginationProps, DargStyleConfig, DownDragStyleConfig } from './index.interface'
import { showPromp, IS_H5 } from '@utils/index'
import _debounce from 'lodash/debounce'

import './index.scss'

const defaultDownDragStyle = {
  height: 0 + 'px',
  display: 'none'
}

const Pagination = (props: PaginationProps) => {
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
  const [dargStyle, setDargStyle] = useState<DargStyleConfig>({
    top: 0 + 'px',
    height: typeof height === 'string' ? height : height + 'px'
  })
  //下拉图标的样式
  const [downDragStyle, setdownDragStyle] = useState<DownDragStyleConfig>(defaultDownDragStyle)
  const [pullDownTextState, setPullDownTextState] = useState<string>(pullDownText)
  const [start_p, setStart_p] = useState<any>({})
  const [scrollY, setScrollY] = useState<boolean>(true)
  //刷新状态 0不做操作 1刷新 -1加载更多
  const [dargState, setDargState] = useState<number>(0)
  // 是否可以下拉
  const [isPullDownAble, setIsPullDownAble] = useState<boolean>(true)
  // 下拉的加载状态
  const [localRefreshLoading, setLocalRefreshLoading] = useState<boolean>(false)
  // 是否显示置顶
  const [scrollToTopAble, setScrollToTopAble] = useState<boolean>(false)
  // 竖直滚动高度
  const [scrollTop, setScrollTop] = useState<number>(0)


  const scollViewRef = useRef<any>(null)

  //还原初始设置
  const reduction = useCallback((pullDownTextProp) => {
    const time = 0.5
    // this.setState({
    //   dargState: 0,
    //   dargStyle: {
    //     top: 0 + 'px',
    //     transition: `all ${time}s ease-in 0.5s`,
    //     height: typeof height === 'string' ? height : height + 'px'
    //   },
    //   downDragStyle: {
    //     height: 0 + 'px',
    //     transition: `all ${time}s ease-in 0.5s`
    //   },
    //   scrollY: true,
    //   localRefreshLoading: false,
    //   pullDownTextState: pullDownTextProp || pullDownText
    // })
    setTimeout(() => {
      // this.setState({
      //   dargStyle: {
      //     top: 0 + 'px',
      //   },
      //   downDragStyle: {
      //     height: 0 + 'px',
      //     display: 'none'
      //   },
      //   pullDownTextState: pullDownText,
      //   isPullDownAble: true
      // })
    }, 1 * 1000)
  }, [pullDownText, height])

  // 判断是否是禁止下拉元素
  const isDisabledElement = useCallback((element) => {
    // 禁止下拉的样式类
    const disabledClassNames = ['weui-picker']
    let res = false
    if (element.className) {
      res = disabledClassNames.some(item => element.className.indexOf(item) !== -1)
    }
    return res
  }, [])


  const touchStart = useCallback((e) => {
    setStart_p({
      ...e.touches[0]
    })
  },[])

  const touchMove = useCallback((e) => {
    let _isDisabledElement = isDisabledElement(e.target)
    if (_isDisabledElement) return
    if (!isPullDownAble || disablePullDown) return
    let move_p = e.touches[0],//移动时的位置
      deviationX = 0.30,//左右偏移量(超过这个偏移量不执行下拉操作)
      deviationY = 70,//拉动长度（低于这个值的时候不执行）
      maxY = 100//拉动的最大高度

    let start_x = start_p.clientX,
      start_y = start_p.clientY,
      move_x = move_p.clientX,
      move_y = move_p.clientY

    //得到偏移数值
    let dev = Math.abs(move_x - start_x) / Math.abs(move_y - start_y)
    //当偏移数值大于设置的偏移数值时则不执行操作
    if (dev < deviationX) {
      let pY = Math.abs(move_y - start_y) / 3.5//拖动倍率
      if (move_y - start_y > 0) {//下拉操作
        if (pY >= deviationY) {
          setDargState(1)
          setPullDownTextState(pullingDownText)
          setIsPullDownAble(false)
        } else {
          setDargState(0)
          setPullDownTextState(pullDownText)
        }
        if (pY >= maxY) {
          pY = maxY
        }
        let _dargStyle = {
          top: `${pY}px`,
          height: dargStyle.height
        }
        setDargStyle(_dargStyle)
        let _downDragStyle = {
          height: `${pY}px`,
          display: 'none'
        }
        setdownDragStyle(_downDragStyle)
        //拖动的时候禁用
        setScrollY(false)

      }
    }

  }, [isDisabledElement, isPullDownAble, disablePullDown, start_p])

  useEffect(() => {
    if (IS_H5 && scollViewRef) {
      scollViewRef.current.onTouchMove = touchMove
    }
  }, [])

  // 下拉刷新
  const onRefreshFun = useCallback(() => {
    setLocalRefreshLoading(true)
    !refreshLoading && onRefresh && onRefresh()
  }, [refreshLoading])

  // 上拉加载
  const onEndReachedFun = useCallback(() => {
    if (!endReachedError && !endReachedLoading) {
      onEndReached && onEndReached()
    }
  }, [onEndReached, endReachedError, endReachedLoading])

  // 强制上拉加载
  const forceEndReachedFun = useCallback(() => {
    if (!endReachedLoading) {
      onEndReached && onEndReached()
    }
  }, [onEndReached, endReachedLoading])

  const touchEnd = useCallback(() => {
    if (dargState === 1) {
      showPromp({
        isShowPromp: showRefreshPromp,
        tip: refreshPrompText,
        callback: onRefresh,
        cancelCallback: reduction('取消刷新')
      })
    } else {
      !localRefreshLoading && reduction('')
    }
  }, [showRefreshPromp, refreshPrompText, dargState, localRefreshLoading])

  // 滚动到顶部事件
  const scrollToUpper = _debounce(() => {
    setIsPullDownAble(true)
  }, 400)

  // 滚动到底部事件
  const scrollToLower = _debounce(() => {
    onEndReachedFun()
  }, 400)

  const onScroll = useCallback(({ detail }) => {
    const { scrollTop } = detail
    setScrollTop(0)
    if (scrollTop >= SCROLL_TOP_HEIGHT && !scrollToTopAble) {
      setScrollToTopAble(true)
    }
    if (scrollTop < SCROLL_TOP_HEIGHT && scrollToTopAble) {
      setScrollToTopAble(false)
    }
    if (scrollTop === 0 && !isPullDownAble) {
      setIsPullDownAble(true)
    }
    if (scrollTop > 0 && isPullDownAble) {
      setIsPullDownAble(false)
    }
  }, [isPullDownAble, scrollToTopAble])

  // 置顶
  const scrollToTop = useCallback(() => {
    setScrollTop(0)
    setScrollToTopAble(false)
  }, [])

  return (
    <View className='fx-pagination-wrap drag-updata-page'>
      <ScrollView
        className='drag-updata'
        ref={scollViewRef}
        onTouchMove={touchMove}
        onTouchEnd={touchEnd}
        onTouchStart={touchStart}
        onScrollToUpper={scrollToUpper}
        onScrollToLower={scrollToLower}
        scrollY={scrollY}
          scrollWithAnimation
          onScroll={onScroll}
          enableBackToTop
          scrollTop={scrollTop}
      >
      </ScrollView>
    </View>
  )

}

export default Pagination
