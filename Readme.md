# 相关说明

## package.json
1. --config就是给webpack指定config文件
2."build": "build:client && build:server"的意思就是限制性npm run build:client 命令，再执行npm run build:server命令
3.rimraf是nodejs非常小的一个包，这个包是专门用来删除文件夹的
4.我们发现每次执行完npm run build 命令（git 2.4 状态），dist目录下都会生成新的文件，而且js文件不会被覆盖。我们希望dist目录每次只保留最新的打包后的文件，所以加入clear命令。

## 文件引用
package.json ----使用script命令，指定webpack config文件途径----> webpack.config.client.js ----webpack设置应用入口文件----> app.js ----挂载页面----> App.jsx