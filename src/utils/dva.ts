import { create } from 'dva-core';
import createLoading from 'dva-loading';
import models from '../models/index'


/**
 * 启动dva，并返回model
 */
export default (() => {
  // 创建
  let app = create()
  // 使用插件
  app.use(createLoading())
  // 注册model
  models.forEach(model => app.model(model))
  // 启动
  app.start()
  return app._store
})()
