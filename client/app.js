// 作为应用入口，完成应用，mount到HTML里面
import React from 'react';
const ReactDom = require('react-dom'); // 用来把react组件渲染到都dom里面
import App from './APP.jsx';

ReactDom.hydrate(<App/>, document.getElementById('root')) // 使用reactDom插件将组件挂载到root下面，将<app></app>覆盖掉
 