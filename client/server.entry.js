/**
 * 针对服务端的入口
 * jsx代码不能再服务端直接运行，所以要打包下
 */
import React from 'react'
import App from './App.jsx' // 不加“./”，webpack会直接到node_modules里面找

export default <App />