const express = require('express')
const ReactSSR = require('react-dom/server') // 服务端的react编译插件
// const serverEntry = require('../dist/server-entry') // 服务端代码所在地（打包完后的服务端端代码）
const serverEntry = require('../dist/server-entry').default // 为什么要这样写，而不用上面的那种写法？ 因为我们的server-entry.js是用export default的方式导出的数据，而node遵从commonjs规范，只能用require的方式来导入，但是require方式是获取不到export default出来的内容的。所以在后面加一个.default来获取export default 的内容
const fs = require('fs')
const path = require('path')
const app = express()

app.use('/public', express.static(path.join(__dirname, '../dist'))) // 给编译的静态文件前面加上/public

const template = fs.readFileSync(path.join(__dirname, '../dist/index.html'), 'utf8') // 获取web端编译好的index.html文件

// 从浏览器上发出的任何请求，都让它返回服务端渲染的代码
app.get('*', function(req, res){
    const appString = ReactSSR.renderToString(serverEntry) // 将编译好的服务端代码放入web端编译好的indx.html中，返回给浏览器
    // 这里，服务端将已经处理好的dom结构（包括数据填充）放到index.html中，返回给浏览器
    res.send(template.replace('<!-- app -->', appString))
})

app.listen(3333, function(){
    console.log('服务正在监听3333端口')
})