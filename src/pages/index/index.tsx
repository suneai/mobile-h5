
import React, { Component ,ComponentClass } from 'react'
import { View } from '@tarojs/components'
import { IndexProps, IndexState } from './index.interface'
import './index.scss'

class Index extends Component<IndexProps,IndexState >  {

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
        222
      </View>
    )
  }
}

export default Index as ComponentClass