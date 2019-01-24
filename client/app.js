import React from 'react';
import ReactDOM from 'react-dom'; // 将react组件渲染到DOM中
import App from './App.jsx';

ReactDOM.hydrate(<App />, document.getElementById('root')) // 将组件挂载到页面上,将<app></app>覆盖