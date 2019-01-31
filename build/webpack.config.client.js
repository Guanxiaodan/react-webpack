const path = require('path')
const HTMLPlugin = require('html-webpack-plugin')

// 开发时走客户端渲染
const isDev = process.env.NODE_ENV === 'development'  // process.env.NODE_ENV 是在package.json的命令行里面设置的


const config = {
    mode:"development",
    entry:{
        app: path.join(__dirname,'../client/app.js')
    },
    output:{
        filename:'[name].[hash].js',
        path: path.join(__dirname, '../dist'),
        publicPath: '/public'
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
    plugins:[
        new HTMLPlugin({
            template:path.join(__dirname, '../client/template.html')
        }) // 可以生成一个HTML页面，同时在编译时将我们的entry注入到页面中，路径根据output里的配置生成
    ]
}

// 如果是开发环境,webpackdevserver 用来服务经过webpack编译出来的静态文件
if(isDev){
    console.log('---现在是开发环境---')
    config.devServer = {
        host:'0.0.0.0', // 因为我们是在本地开发，可以用任意的地址访问，比如127.0.0.1，localhost ,本地IP.
        port:'8888',
        contentBase: path.join(__dirname, '../dist'),
        hot: true, // 启动hot-module-replacement
        overlay: { // webpack 编译的过程中出现错误就在页面上显示出一层黑色背景的错误信息
            errors:true
        }
    }
}

module.exports = config