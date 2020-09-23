
import React, { Component } from 'react'
import { View, Text } from '@tarojs/components'
import { TestProps, TestState } from './test.interface'
// import { } from '@components'
import { connect } from 'react-redux';
import { Pagination } from '@components'
import { getScrollHeight } from '@utils/index'

const SCROLL_HEIGHT = getScrollHeight([])
import './index.scss'
@connect(({ test }) => ({
  ...test,
}))
export default class Test extends Component<TestProps, TestState>  {

  state = {
    refreshLoading: false,
    endReachedLoading: false,
    data: []
  }

  componentWillMount() {
    this.onRefresh()
  }

  onRefresh = () => {
    this.setState({
      refreshLoading: true,
    }, () => {
      setTimeout(() => { this.setState({ refreshLoading: false, data: new Array(24).fill(30) }) }, 1000)
    })
  }

  onEndReached = () => {
    const { data } = this.state
    if (data.length >= 30) return;
    this.setState({
      endReachedLoading: true,

    }, () => {
      setTimeout(() => { this.setState({ endReachedLoading: false, data: data.concat([...new Array(10).fill(10)]) }) }, 1000)
    })
  }

  render() {
    const { refreshLoading, endReachedLoading, data } = this.state
    console.log(data)

    let endReachedError = data.length >= 20 && data.length < 30 ? true : false
    return (
      <View className='test'>
        <Pagination
          height={SCROLL_HEIGHT}
          showCoverLoading={data.length === 0}
          refreshLoading={refreshLoading}
          endReachedLoading={endReachedLoading}
          onRefresh={this.onRefresh}
          onEndReached={this.onEndReached}
          endReachedError={endReachedError}
          showNoMoreData={data.length === 30}
        >
          {
            data.map((item, index) =>
              <View key={index} className='test-item'>
                这里简单的实现列表新闻页面{index + 1}
              </View>)
          }
        </Pagination>
      </View>
    )
  }
}
