// 作为应用入口，完成应用，mount到HTML里面
import React from 'react';
const ReactDom = require('react-dom'); // 用来把react组件渲染到都dom里面(将react组件转换成HTML语言，并插入指定dom节点)
import App from './APP.jsx';

ReactDom.hydrate(<App/>, document.getElementById('root')) // 使用reactDom插件将App组件挂载到root下面，用JSX语法编译后生成的DOM换掉HTML文件中root下面的所有内容，用生成的js文件注入到HTML中。从哪里来的HTML文件？在webpack使用的html-webpack-plugin插件，会在编译时候生成HTML文件。就是dist文件夹下面的index.html
 