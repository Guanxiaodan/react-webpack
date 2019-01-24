const path = require('path')
const HTMLPlugin = require('html-webpack-plugin')

module.exports = {
    mode:"development",
    entry:{
        app: path.join(__dirname,'../client/app.js')
    },
    output:{
        filename:'[name].[hash].js',
        path: path.join(__dirname, '../dist'),
        publicPath: ''
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
        new HTMLPlugin() // 可以生成一个HTML页面，同时在编译时将我们的entry注入到页面中，路径根据output里的配置生成
    ]
}