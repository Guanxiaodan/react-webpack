const path = require('path')
/**
 * 不需要plugins，因为服务端不需要生成html文件
 */
module.exports = {
    mode:"development",
    target: 'node', // webpack打包出来的内容在什么环境中执行，如果是浏览器就是node
    entry:{
        app: path.join(__dirname,'../client/server.entry.js')
    },
    output:{
        filename:'server-entry.js',
        path: path.join(__dirname, '../dist'),
        publicPath: '/public',
        libraryTarget:'commonjs2' // 打包的js使用的模块方案，umd cmd amd global。这里是使用最新的模块commonjs加载的方案
    },
    module:{
        rules:[
            {
                test: /.jsx$/,
                loader: 'babel-loader'
            },
            {
                test: /.js$/,
                loader: 'babel-loader',
                exclude:[
                    path.join(__dirname,'../node_modules')
                ]
            },
        ]
    },
}