# 相关说明

## package.json
### 1. --config就是给webpack指定config文件
### 2."build": "build:client && build:server"的意思就是限制性npm run build:client 命令，再执行npm run build:server命令
### 3.rimraf是nodejs非常小的一个包，这个包是专门用来删除文件夹的
### 4.我们发现每次执行完npm run build 命令（git 2.4 状态），dist目录下都会生成新的文件，而且js文件不会被覆盖。我们希望dist目录每次只保留最新的打包后的文件，所以加入clear命令。
### 5.cross-env NODE_DEV=development 设置环境变量 为什么要用cross-env 因为Linux，Windows，不同系统下设置环境变量的方式有点差异，所以使用cross-dev插件来进行兼容

## 文件引用
package.json ----使用script命令，指定webpack config文件途径----> webpack.config.client.js ----webpack设置应用入口文件----> app.js ----挂载页面----> App.jsx

## 文件怎么打开？
### 1.前端打开：
执行 npm run build ,用webstorm打开dist/index.html
### 2.后端打开
执行 npm run build ,npm start ,在浏览器输入localhost:3333

## webpack配置
### 1.webpack dev server
    webpack 官方提供的插件，让我们通过webpack的配置启动一个服务器，这个服务器能让我们方便地访问到css,js ,还有生成的HTML，并且文件在编译的过程中是存在内存中的。每次发现文件变化，它会自送执行编译的过程。就不需要每次都手动执行npm run build 

 ### 2.hot module replacement
    文件有任何改动，能在页面无刷新地看到编辑后的效果。能够保持当前的状态，每次刷新都会重新去求情，浪费时间，这个会保持当前的请求状态
