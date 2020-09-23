/**
 * pages页面快速生成脚本 
 * 用法：npm run tep `文件名`
 */

const fs = require('fs');

const dirName = process.argv[2];
const capPirName = dirName.substring(0, 1).toUpperCase() + dirName.substring(1);
if (!dirName) {
    console.log('文件夹名称不能为空！');
    console.log('示例：npm run tep test');
    process.exit(0);
}

//页面模板
const indexTep = `
import React, { Component } from 'react'
import { View, Text } from '@tarojs/components'
import { ${capPirName}Props, ${capPirName}State } from './${dirName}.interface'
import { connect } from 'react-redux';
import PAGE_NAME from "./model"

// import { } from '@components'

import './index.scss'

@connect(({ ${dirName} }) => ({
  ...${dirName},
}),
(dispatch: any) => {
  return ['save'].reduce((res: any, item: any) => {
    res[item] = (payload: any, callback: Function) => dispatch({ type: \`\${PAGE_NAME}/\${item}\`, payload, callback })
    return res
  }, { dispatch })
})
export default class ${capPirName} extends Component<${capPirName}Props,${capPirName}State >  {

  componentWillMount () { }

  componentDidMount () { }

  componentWillUnmount () { }

  componentDidShow () { }

  componentDidHide () { }

  render () {
    return (
      <View className='index'>
        <Text>Hello world!</Text>
      </View>
    )
  }
}
`

// scss文件模版
const scssTep = `
${dirName}-wrap {
    width: 100%;
    min-height: 100vh;
}
`

// config 接口地址配置模板
const configTep = `
export default {
  test: '/wechat/perfect-info', //xxx接口
}
`
// index.config 模板
const indexConfigTep = `
export default {
  navigationBarTitleText : '标题', 
}
`
// 接口请求模板
const serviceTep = `
import Api from '@utils/request'

export const testApi = data => Api.test(
  data
)
`

//model模板

const modelTep = `
// import Taro from '@tarojs/taro';
import * as ${dirName}Api from './service';
export const PAGE_NAME = ${dirName}

export default {
  namespace: PAGE_NAME,
  state: {
  },

  effects: {},

  reducers: {}

}
`

const interfaceTep = `
/**
 * ${dirName}.state 参数类型
 *
 * @export
 * @interface ${capPirName}State
 */
export interface ${capPirName}State {}

/**
 * ${dirName}.props 参数类型
 *
 * @export
 * @interface ${capPirName}Props
 */
export interface ${capPirName}Props {}
`

fs.mkdirSync(`./src/pages/${dirName}`); // mkdir $1
process.chdir(`./src/pages/${dirName}`); // cd $1

fs.writeFileSync(`index.tsx`, indexTep); //tsx
fs.writeFileSync(`index.scss`, scssTep); // scss
fs.writeFileSync('config.ts', configTep); // config
fs.writeFileSync('index.config.ts', indexConfigTep); // indexConfigTep
fs.writeFileSync('service.ts', serviceTep); // service
fs.writeFileSync('model.ts', modelTep); // model
fs.writeFileSync(`index.interface.ts`, interfaceTep); // interface
process.exit(0);