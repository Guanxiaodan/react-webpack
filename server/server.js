const express = require('express')
const ReactSSR = require('react-dom/server')
const fs = require('fs')
const path = require('path')
const serverEntry = require('../dist/server-entry.js').default  // 获取到打包后的组件
const app = express()

app.use('/public',express.static(path.join(__dirname, '../dist')))

const template = fs.readFileSync(path.join(__dirname, '../dist/index.html'), 'utf8')


app.get('*', function(req, res){
    const appString = ReactSSR.renderToString(serverEntry)
    console.log('服务端', appString)
    res.send(template.replace('<!-- app -->', appString)) // 将index.html模板中的'<!-- app -->'替换成打包后的组件，然后在返回给浏览器
})

app.listen(3333, function(){
    console.log('服务器在监听3333')
}) 