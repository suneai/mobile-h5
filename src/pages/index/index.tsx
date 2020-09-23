
import React, { Component } from 'react'
import { View, Text } from '@tarojs/components'
import { IndexProps, IndexState } from './index.interface'
import { AtButton } from 'taro-ui'

import { Pagination } from '@components'
// import fetch from '@utils/request'

import './index.scss'

export default class Index extends Component<IndexProps,IndexState >  {

  componentWillMount () {
    // console.log(fetch)
   }

  componentDidMount () { }

  componentWillUnmount () { }

  componentDidShow () { }

  componentDidHide () { }

  render () {
    return (
      <View className='index'>
        <Pagination
        
        />
      </View>
    )
  }
}
